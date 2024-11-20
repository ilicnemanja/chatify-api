import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FriendRequestsModule } from './friend-requests/friend-requests.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
config();
@Module({
  imports: [
    UsersModule,
    FriendRequestsModule,
    PostsModule, 
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING), AuthModule, FriendsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
