import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './entites/users.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name) private readonly usersModel: Model<Users>
    ) { }

    async addUser(createUserDto: CreateUserDto) {
        // check if the user with same username or email already exists
        const userExists = await this.usersModel.findOne({
            $or: [
                { username: createUserDto.username },
                { email: createUserDto.email }
            ]
        }).exec();

        if (userExists) {
            throw new Error('User already exists');
        }
        
        const user = new this.usersModel({
            clerkId: createUserDto.clerkId,
            username: createUserDto.username,
            email: createUserDto.email,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            profilePicture: createUserDto.imageUrl,
            lastActive: createUserDto.lastActiveAt,
        });
        return await user.save();
    }
    
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
