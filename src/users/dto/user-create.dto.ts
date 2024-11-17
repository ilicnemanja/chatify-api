import { IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {

    @IsString()
    readonly clerkId: string;

    @IsString()
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsString()
    readonly imageUrl: string;

    @IsNumber()
    readonly createdAt: Date;

    @IsNumber()
    readonly updatedAt: Date;

    @IsNumber()
    readonly lastActiveAt: Date;
}
