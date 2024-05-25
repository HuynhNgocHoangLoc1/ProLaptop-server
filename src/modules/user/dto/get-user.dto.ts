import { PageOptionsDto } from "src/common/dtos/pageOption";
import { GenderEnum } from "src/common/enum/enum";

export class GetUserParams extends PageOptionsDto {
    userName: string;
    password: string;
    email: string;
    gender: GenderEnum;
    address: string;
    phone: string;
    avatar: string;
}