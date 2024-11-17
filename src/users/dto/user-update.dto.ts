import { IsString, IsEmail, IsOptional } from 'class-validator';

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

    @IsString()
    @IsOptional()
    readonly updatedAt?: string;

    @IsString()
    @IsOptional()
    readonly lastActive?: string;

    @IsString()
    @IsOptional()
    bio?: string;
}
