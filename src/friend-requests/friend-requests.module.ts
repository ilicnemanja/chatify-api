import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsController } from './friend-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequests, FriendRequestsSchema } from './entities/friend-requests.entity';
import { UsersModule } from 'src/users/users.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendRequests.name, schema: FriendRequestsSchema, collection: 'FriendRequests' },
    ]),
    UsersModule,
    FriendsModule
  ],
  providers: [FriendRequestsService],
  controllers: [FriendRequestsController]
})
export class FriendRequestsModule {}
