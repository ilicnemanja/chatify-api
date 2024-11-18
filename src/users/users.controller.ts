import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("create")
    addUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.addUser(createUserDto);
    }

    @Put("update/:clerkId")
    updateUser(@Body() updateUserDto: UpdateUserDto, @Param('clerkId') clerkId: string) {
        return this.usersService.updateUser(updateUserDto, clerkId);
    }

    @Delete("delete/:clerkId")
    deleteUser(@Param('clerkId') clerkId: string) {
        return this.usersService.deleteUser(clerkId);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':username')
    findOne(@Param('username') username: string) {
        return this.usersService.findOne(username);
    }

    @Get(':username/all')
    findAllUsersMatchingUsername(@Param('username') username: string) {
        return this.usersService.findAllUsersMatchingUsername(username);
    }
}
