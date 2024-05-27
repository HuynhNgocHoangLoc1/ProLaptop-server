import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(createOrderDetailDto);
  } 

  @Get()
  async findAll() {
    const orderDetails = await this.orderDetailService.findAll();
    return { orderDetails, message: 'Successfully fetched all orderDetails' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const orderDetail = await this.orderDetailService.findOne(id);
    if (orderDetail) {
      return { orderDetail, message: 'Successfully fetched orderDetail' };
    } else {
      return { message: `Order with ID ${id} not found` };
    }
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
    const result = await this.orderDetailService.remove(id);
    return result;
  }
}
