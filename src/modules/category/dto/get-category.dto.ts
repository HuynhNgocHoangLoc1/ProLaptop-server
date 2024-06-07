import { PageOptionsDto } from "src/common/dtos/pageOption"

export class GetCategoryDto extends PageOptionsDto {
    name: string
    description: string
}