import { PageOptionsDto } from "src/common/dtos/pageOption";
import { GenderEnum, RoleEnum } from "src/common/enum/enum";

export class GetUserDto extends PageOptionsDto {
    userName: string;
    password: string;
    email: string;
    gender: GenderEnum;
    address: string;
    phone: string;
    avatar: string;
    role: RoleEnum;
}