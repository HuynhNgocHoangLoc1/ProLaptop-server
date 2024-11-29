import { PageOptionsDto } from "../../../common/dtos/pageOption";

export class GetOrderDetailDto extends PageOptionsDto{
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
}