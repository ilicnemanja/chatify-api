import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly username?: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsString()
    @IsOptional()
    readonly firstName?: string;

    @IsString()
    @IsOptional()
    readonly lastName?: string;

    @IsString()
    @IsOptional()
    readonly profilePicture?: string;

    @IsNumber()
    @IsOptional()
    readonly updatedAt?: string;

    @IsNumber()
    @IsOptional()
    readonly lastActive?: Date;

    @IsString()
    @IsOptional()
    bio?: string;
}
