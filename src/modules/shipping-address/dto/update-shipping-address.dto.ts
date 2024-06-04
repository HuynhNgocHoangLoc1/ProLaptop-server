import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingAddressDto } from './create-shipping-address.dto';

export class UpdateShippingAddressDto extends PartialType(CreateShippingAddressDto) {
  static district: string;
  static address: string;
  static city: string;
}
