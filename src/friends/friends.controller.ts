import { Controller, Get, Param, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
    constructor(
        private readonly friendsService: FriendsService,
    ) {}

    @Get(':userId/friend-status/:friendId')
    async getFriendStatus(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendsService.getFriendshipStatus(userId, friendId);
    }

    @Get(':userId')
    async getFriendsByUserId(@Param('userId') userId: string) {
        return this.friendsService.getAllFriendsByUserId(userId);
    }

    @Post(':userId/add-close-friend/:friendId')
    async addToCloseFriends(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendsService.setCloseFriend(userId, friendId);
    }

    @Post(':userId/remove-close-friend/:friendId')
    async removeFromCloseFriends(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendsService.removeCloseFriend(userId, friendId);
    }

    @Post(':userId/add-friend/:friendId')
    async addFriend(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendsService.insertDouble(userId, friendId);
    }

    @Post(':userId/remove-friend/:friendId')
    async removeFriend(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendsService.removeDouble(userId, friendId);
    }
}
