import { IsString, IsEmail } from 'class-validator';

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

    @IsString()
    readonly createdAt: string;

    @IsString()
    readonly updatedAt: string;

    @IsString()
    readonly lastActiveAt: string;
}
