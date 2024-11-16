import { Injectable } from '@nestjs/common';
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

        const closeFriends = await this.usersService.getUsersByIds(closeFriendIds);
        const allFriends = await this.usersService.getUsersByIds(allFriendIds);
    
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

    // async createFriendRequest(senderId: string, receiverId: string) {
    //     const friendRequest = new this.friendRequestsModel({
    //         senderId,
    //         receiverId
    //     });

    //     return friendRequest.save();
    // }

    // async acceptFriendRequest(senderId: string, receiverId: string) {
    //     await this.friendRequestsModel.updateOne(
    //         { senderId, receiverId },
    //         { $set: { status: "accepted" } }
    //     ).exec();
    // }

    // async rejectFriendRequest(senderId: string, receiverId: string) {
    //     await this.friendRequestsModel.deleteOne({ senderId, receiverId }).exec();
    // }
    
}
