import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendRequests } from './entities/friend-requests.entity';
import { UsersService } from 'src/users/users.service';
import { FriendsService } from 'src/friends/friends.service';

@Injectable()
export class FriendRequestsService {
    constructor(
        @InjectModel(FriendRequests.name) private readonly friendRequestsModel: Model<FriendRequests>,
        private readonly friendsService: FriendsService,
        private readonly usersService: UsersService
    ) {}

    async sendFriendRequest(senderId: string, receiverId: string) {
        const existingFriendRequest = await this.friendRequestsModel.findOne({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ],
            status: { $in: ["pending", "accepted"] }
        }).exec();

        if (existingFriendRequest) {
            throw new HttpException("Friend request already sent!", HttpStatus.NOT_MODIFIED);
        }
    
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

    async getAllFriendRequestSend(userId: string) {
        const friendRequests = await this.friendRequestsModel.find(
            {
                senderId: userId,
                status: "pending"
            }
        ).exec();

        const receiverIds = friendRequests.map(request => request.receiverId);

        return receiverIds;
    }

    async acceptFriendRequest(receiverId: string, senderId: string) {
        await this.friendRequestsModel.updateOne(
            { senderId, receiverId },
            { $set: { status: "accepted" } }
        ).exec();

        await this.friendsService.insertDouble(receiverId, senderId);
    }

    async rejectFriendRequest(senderId: string, receiverId: string,) {
        await this.friendRequestsModel.deleteOne({ senderId, receiverId }, {
            status: "pending"
        }).exec();
    }

    async removeAcceptedFriendRequest(senderId: string, receiverId: string) {
        await this.friendRequestsModel.deleteOne({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ],
            status: "accepted"
        }).exec();
    }
    
    async findAllNoFriendsUsers(username: string, clerkId: string): Promise<any[]> {
        const users = await this.usersService.findAllUsersMatchingUsername(username);
    
        if (!users.length) {
            return [];
        }
    
        const friends = await this.friendsService.getAllFriendsByUserId(clerkId);
    
        const allFriendIds = friends.allFriends.map(friend => friend.clerkId);
    
        const allFriendRequestSend = await this.getAllFriendRequestSend(clerkId);
    
        const filteredUsers = users.map(user => {
            return {
                ...user,
                isFriendRequestSent: allFriendRequestSend.includes(user.clerkId),
                isFriend: allFriendIds.includes(user.clerkId)
            };
        }).filter(user => !allFriendIds.includes(user.clerkId));
    
        return filteredUsers;
    }
    
}
