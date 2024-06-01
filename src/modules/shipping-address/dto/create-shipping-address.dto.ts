import { IsNotEmpty } from "class-validator";

export class CreateShippingAddressDto {
    @IsNotEmpty()
    district: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    city: string;
}
