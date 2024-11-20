import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friends } from './entities/friends.entity';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendsService {
    constructor(
        @InjectModel(Friends.name) private readonly friendsModel: Model<Friends>,
        private readonly usersService: UsersService
    ) {}

    private async insertFriend(clerkId: string, friendClerkId: string): Promise<Friends> {
        const newFriend = new this.friendsModel({
            clerkId,
            friendClerkId
        });

        return newFriend.save();
    }

    async insertDouble(clerkId: string, friendClerkId: string): Promise<void> {
        await this.insertFriend(clerkId, friendClerkId);
        await this.insertFriend(friendClerkId, clerkId);
    }

    async getFriends(clerkId: string): Promise<Friends[]> {
        return this.friendsModel.find({ clerkId }).exec();
    }

    async getCloseFriends(clerkId: string): Promise<Friends[]> {
        return this.friendsModel.find({ clerkId, isCloseFriend: true }).exec();
    }

    private async removeFriend(clerkId: string, friendClerkId: string): Promise<any> {
        return this.friendsModel.deleteOne({ clerkId, friendClerkId }).exec();
    }

    async removeDouble(clerkId: string, friendClerkId: string): Promise<void> {
        await this.removeFriend(clerkId, friendClerkId);
        await this.removeFriend(friendClerkId, clerkId);
    }

    async setCloseFriend(clerkId: string, friendClerkId: string) {
        return this.friendsModel.updateOne({ clerkId, friendClerkId }, { isCloseFriend: true }).exec();
    }

    async removeCloseFriend(clerkId: string, friendClerkId: string) {
        return this.friendsModel.updateOne({ clerkId, friendClerkId }, { isCloseFriend: false }).exec();
    }

    private async areFriends(clerkId: string, friendClerkId: string) {
        return this.friendsModel.exists({ clerkId, friendClerkId });
    }

    private async areCloseFriends(clerkId: string, friendClerkId: string) {
        return this.friendsModel.exists({ clerkId, friendClerkId, isCloseFriend: true });
    }

    async getFriendshipStatus(clerkId: string, friendClerkId: string): Promise<{ areFriends: boolean, areCloseFriends: boolean }> {
        const areFriends = await this.areFriends(clerkId, friendClerkId);
        const areCloseFriends = await this.areCloseFriends(clerkId, friendClerkId);

        return {
            areFriends: areFriends?._id ? true : false,
            areCloseFriends: areCloseFriends?._id ? true : false
        };
    }

    async removeAllFriends(clerkId: string) {
        return this.friendsModel.deleteMany({ clerkId }).exec();
    }

    async removeAllCloseFriends(clerkId: string) {
        return this.friendsModel.deleteMany({ clerkId, isCloseFriend: true }).exec();
    }

    async getAllFriendsByUserId(userId: string) {
        const getCloseFriends = await this.getCloseFriends(userId);
        const getAllFriends = await this.getFriends(userId);
        
        const closeFriendIds = getCloseFriends.map(friend => friend.friendClerkId);
        const allFriendIds = getAllFriends.map(friend => friend.friendClerkId);

        const closeFriends = await this.usersService.getUsersByClerkIds(closeFriendIds);
        const allFriends = await this.usersService.getUsersByClerkIds(allFriendIds);
    
        return { closeFriends, allFriends };
    }

}
