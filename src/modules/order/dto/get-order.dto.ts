import { PageOptionsDto } from "src/common/dtos/pageOption";

export class GetOrderParams extends PageOptionsDto {
 userId: string;
 date: Date;
 name: string;
 email: string;
 phoneNumber: string;
 shippingAddress: string;
 price: number;
}