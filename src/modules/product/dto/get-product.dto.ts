import { PageOptionsDto } from "src/common/dtos/pageOption";

export class GetProductDto extends PageOptionsDto {
   name: string;
   description: string;
   categoryId: string;
   price: number;
   stockQuantity: number;
   imageUrl: string;
   ram: string;
   cpu: string;
   card: string;
   chip: string;
   hardDrive: string;
}