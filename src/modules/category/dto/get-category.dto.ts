import { PageOptionsDto } from "src/common/dtos/pageOption"

export class GetCategoryParams extends PageOptionsDto {
    name: string
    description: string
}