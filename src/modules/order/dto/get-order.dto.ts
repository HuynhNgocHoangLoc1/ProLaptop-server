import { PageOptionsDto } from "src/common/dtos/pageOption";

export class GetUserParams extends PageOptionsDto {
 userId: string;
 date: Date;
 name: string;
 email: string;
 phoneNumber: string;
 address: string;
 price: number;
}