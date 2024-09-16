import { PageOptionsDto } from "src/common/dtos/pageOption"

export class GetCartDto extends PageOptionsDto {
    userId: string
    productId: string
    quantity: number
    createdAt: Date
    updatedAt: Date
}