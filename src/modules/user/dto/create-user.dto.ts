import { IsNotEmpty } from "class-validator";
import { GenderEnum } from "src/common/enum/enum";

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
    @IsNotEmpty()
    phone: String;
}
