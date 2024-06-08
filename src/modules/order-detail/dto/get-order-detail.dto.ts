import { PageOptionsDto } from "src/common/dtos/pageOption";

export class GetOrderDetailDto extends PageOptionsDto{
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
}