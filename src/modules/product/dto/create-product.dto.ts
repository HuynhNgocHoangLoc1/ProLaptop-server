import { IsNotEmpty } from "class-validator";

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
