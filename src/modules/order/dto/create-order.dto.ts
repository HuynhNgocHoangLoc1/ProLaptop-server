import { IsNotEmpty } from "class-validator";
import { StatusDelivery } from "src/common/enum/enum";

export class CreateOrderDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    shippingAddress: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    statusDelivery: StatusDelivery;
}
