import { IsNotEmpty, IsOptional } from "class-validator";
import { GenderEnum, RoleEnum } from "src/common/enum/enum";

export class CreateUserDto {
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    gender: GenderEnum;
    @IsNotEmpty()
    address: string;
    @IsOptional() // Để avatar là optional thay vì bắt buộc
    avatar?: string;
    @IsNotEmpty()
    phoneNumber: String; 
}
