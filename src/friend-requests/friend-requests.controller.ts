import { Controller, Get, Param, Post } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';

@Controller('friend-requests')
export class FriendRequestsController {
    constructor(
        private friendRequestsService: FriendRequestsService
    ) {}

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
        return this.friendRequestsService.rejectFriendRequest(friendId, userId);
    }

    @Post(':userId/remove-accepted-friend-request/:friendId')
    async removeAccepted(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.friendRequestsService.removeAcceptedFriendRequest(userId, friendId);
    }

    @Get(':username/all/:clerkId')
    findAllNoFriendsUsers(@Param('username') username: string, @Param('clerkId') clerkId: string) {
        return this.friendRequestsService.findAllNoFriendsUsers(username, clerkId);
    }
}
