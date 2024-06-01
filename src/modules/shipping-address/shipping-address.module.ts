import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressController } from './shipping-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingAddress } from 'src/entities/shipping-address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingAddress]),
  ],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService],
})
export class ShippingAddressModule {}
