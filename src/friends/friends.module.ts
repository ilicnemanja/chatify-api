import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Friends, FriendsSchema } from './entities/friends.entity';
import { FriendsController } from './friends.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Friends.name, schema: FriendsSchema, collection: 'Friends' },
    ]),
    UsersModule,
  ],
  providers: [FriendsService],
  controllers: [FriendsController],
  exports: [FriendsService]
})
export class FriendsModule {}
