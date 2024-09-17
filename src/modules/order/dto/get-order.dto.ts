import { PageOptionsDto } from "src/common/dtos/pageOption";
import { StatusDelivery } from "src/common/enum/enum";

export class GetOrderDto extends PageOptionsDto {
 userId: string;
 date: Date;
 name: string;
 email: string;
 phoneNumber: string;
 shippingAddress: string;
 price: number;
 statusDelivery: StatusDelivery;
}