import { PageOptionsDto } from "../../../common/dtos/pageOption";

export class GetReviewDto extends PageOptionsDto {
    productId: string;
    orderDetailId: string;
    rating: number;
    comment: string;
    date: Date;    
}