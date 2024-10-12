import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    categoryId: string;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    stockQuantity: number;
    @IsOptional()
    imageUrl?: string;
    @IsNotEmpty()
    ram: string;
    @IsNotEmpty()
    cpu: string;
    @IsNotEmpty()
    card: string;
    @IsNotEmpty()
    chip: string;
    @IsNotEmpty()
    hardDrive: string;
}
