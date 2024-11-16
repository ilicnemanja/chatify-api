import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './entites/users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name) private readonly usersModel: Model<Users>
    ) { }

    async findAll() {
        return await this.usersModel.find().exec();
    }

    async findOne(username: string) {
        const user = await this.usersModel.findOne({ username }).exec();

        if (!user) {
            throw new NotFoundException(`User @${username} not found`);
        }
    
        return user;
    }

    async getUsersByIds(ids: string[]) {
        return await this.usersModel.find({
            _id: { $in: ids }
        }).exec();
    }
}
