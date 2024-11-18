import { Controller, Get, Param, Post } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';

@Controller('friend-requests')
export class FriendRequestsController {
    constructor(
        private friendRequestsService: FriendRequestsService
    ) {}

    // @Get(':userId')
    // async getFriendRequestsByUserId(@Param('userId') userId: string) {
    //     return this.friendRequestsService.getFriendRequestsByUserId(userId);
    // }

    @Get(':userId/friends')
    async getFriendsByUserId(@Param('userId') userId: string) {
        return this.friendRequestsService.getAllFriendsByUserId(userId);
    }

    @Post(':userId/add-close-friend/:friendId')
    async addToCloseFriends(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendRequestsService.addToCloseFriends(userId, friendId);
    }

    @Post(':userId/remove-close-friend/:friendId')
    async removeFromCloseFriends(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendRequestsService.removeFromCloseFriends(userId, friendId);
    }

    @Post(':userId/send-friend-request/:friendId')
    async sendFriendRequest(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendRequestsService.sendFriendRequest(userId, friendId);
    }

    @Get(':userId')
    async getFriendRequests(@Param('userId') userId: string) {
        return this.friendRequestsService.getFriendRequests(userId);
    }

    @Post(':userId/accept-friend-request/:friendId')
    async acceptFriendRequest(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendRequestsService.acceptFriendRequest(userId, friendId);
    }

    @Post(':userId/reject-friend-request/:friendId')
    async rejectFriendRequest(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendRequestsService.rejectFriendRequest(userId, friendId);
    }
}
