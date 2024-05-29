import { PageOptionsDto } from "src/common/dtos/pageOption";

export class GetReviewDto extends PageOptionsDto {
    productId: string;
    orderId: string;
    rating: number;
    comment: string;
    date: Date;    
}