import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendRequests } from './entities/friend-requests.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendRequestsService {
    constructor(
        @InjectModel(FriendRequests.name) private readonly friendRequestsModel: Model<FriendRequests>,
        private readonly usersService: UsersService
    ) {}

    // getFriendRequestsByUserId(userId: string) {
    //     return `This action returns all friendRequests by userId: ${userId}`;
    // }

    async getAllFriendsByUserId(userId: string) {
        const friendRequests = await this.friendRequestsModel.find(
            {
                $or: [
                  { senderId: userId },
                  { receiverId: userId }
                ],
                status: "accepted"
              }
        ).exec();

        const closeFriendIds = friendRequests.filter(request => request.isCloseFriend).map(request => {
            if (request.senderId === userId) {
                return request.receiverId;
            }
            return request.senderId;
        });

        const allFriendIds = friendRequests.map(request => {
            if (request.senderId === userId) {
                return request.receiverId;
            }
            return request.senderId;
        });

        const closeFriends = await this.usersService.getUsersByClerkIds(closeFriendIds);
        const allFriends = await this.usersService.getUsersByClerkIds(allFriendIds);
    
        return { closeFriends, allFriends };
    }

    addToCloseFriends(userId: string, friendId: string): void {
        this.friendRequestsModel.updateOne(
            {
                $or: [
                    { senderId: userId, receiverId: friendId },
                    { senderId: friendId, receiverId: userId }
                ],
                status: "accepted"
            },
            {
                $set: { isCloseFriend: true }
            }
        ).exec();
    }

    removeFromCloseFriends(userId: string, friendId: string): void {
        this.friendRequestsModel.updateOne(
            {
                $or: [
                    { senderId: userId, receiverId: friendId },
                    { senderId: friendId, receiverId: userId }
                ],
                status: "accepted"
            },
            {
                $set: { isCloseFriend: false }
            }
        ).exec();
    }

    async sendFriendRequest(senderId: string, receiverId: string) {
        // Check for an existing friend request between sender and receiver
        const existingFriendRequest = await this.friendRequestsModel.findOne({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ],
            status: { $in: ["pending", "accepted"] } // Check only relevant statuses
        }).exec();
    
        // If a matching request exists, throw an exception
        if (existingFriendRequest) {
            throw new HttpException("Friend request already sent!", HttpStatus.NOT_MODIFIED);
        }
    
        // Create and save a new friend request
        const friendRequest = new this.friendRequestsModel({
            senderId,
            receiverId,
            status: "pending"
        });
        await friendRequest.save();
    }
    

    async getFriendRequests(userId: string) {
        const friendRequests = await this.friendRequestsModel.find(
            {
                receiverId: userId,
                status: "pending"
            }
        ).exec();

        const senderIds = friendRequests.map(request => request.senderId);
        const senders = await this.usersService.getUsersByClerkIds(senderIds);

        return senders;
    }

    async acceptFriendRequest(receiverId: string, senderId: string) {
        await this.friendRequestsModel.updateOne(
            { senderId, receiverId },
            { $set: { status: "accepted" } }
        ).exec();
    }

    async rejectFriendRequest(receiverId: string, senderId: string) {
        await this.friendRequestsModel.deleteOne({ senderId, receiverId }).exec();
    }
    
}
