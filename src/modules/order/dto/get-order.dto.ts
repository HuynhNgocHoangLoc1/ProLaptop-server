import { PageOptionsDto } from "src/common/dtos/pageOption";
import { PaymentMethod, StatusDelivery } from "src/common/enum/enum";

export class GetOrderDto extends PageOptionsDto {
 userId: string;
 date: Date;
 name: string;
 email: string;
 phoneNumber: string;
 shippingAddress: string;
 price: number;
 paymentMethod: PaymentMethod;
 statusDelivery: StatusDelivery;
}