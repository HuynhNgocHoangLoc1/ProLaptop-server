import { PageOptionsDto } from "src/common/dtos/pageOption";

export class GetShippingAddressDto extends PageOptionsDto {
    districs: string;
    address: string;
    city: string;
}