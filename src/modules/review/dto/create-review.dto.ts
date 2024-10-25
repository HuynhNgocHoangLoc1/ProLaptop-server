import { IsNotEmpty } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    productId: string;
    
    @IsNotEmpty()
    orderDetailId: string;

    @IsNotEmpty()
    rating: number;

    @IsNotEmpty()
    comment: string;
}
