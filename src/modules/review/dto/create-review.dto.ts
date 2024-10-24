import { IsNotEmpty } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    productId: string;
    
    @IsNotEmpty()
    orderId: string;

    @IsNotEmpty()
    rating: number;

    @IsNotEmpty()
    comment: string;
}
