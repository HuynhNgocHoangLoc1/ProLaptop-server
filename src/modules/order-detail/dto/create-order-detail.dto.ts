import { IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class CreateOrderDetailDto {
    @IsNotEmpty()
    orderId: string;
    @IsNotEmpty()
    productId: string;
    @IsNotEmpty()
    quantity: number;
    @IsNotEmpty()
    price: number;
}
