import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { GetShippingAddressDto } from './dto/get-shipping-address.dto';

@Controller('shipping-address')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @Post()
  async create(@Body() createShippingAddressDto: CreateShippingAddressDto) {
    return this.shippingAddressService.create(createShippingAddressDto);
  }

  @Get()
  async findAll(@Query() params: GetShippingAddressDto) {
    return this.shippingAddressService.findAll(params);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.shippingAddressService.findOneById(id);
  }


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateShippingAddressDto: UpdateShippingAddressDto,
  ) {
    const result = await this.shippingAddressService.update(id, updateShippingAddressDto);
    return { result, message: 'Successfully update ShippingAddress' };
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
  return this.shippingAddressService.remove(id);
  }
}
