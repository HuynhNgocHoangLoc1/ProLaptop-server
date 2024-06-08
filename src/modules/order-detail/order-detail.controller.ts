import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { GetOrderDetailDto } from './dto/get-order-detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(createOrderDetailDto);
  } 

  @Get()
  async findAll(@Query() params: GetOrderDetailDto) {
    return this.orderDetailService.findAll(params);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.orderDetailService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    const result = await this.orderDetailService.update(id, updateOrderDetailDto);
    return { result, message: 'Successfully update order detail' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
  return this.orderDetailService.remove(id);
  }
}
