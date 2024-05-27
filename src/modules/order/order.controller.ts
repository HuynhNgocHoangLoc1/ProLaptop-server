import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

 
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }


  @Get()
  async findAll() {
    const orders = await this.orderService.findAll();
    return { orders, message: 'Successfully fetched all orders' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.orderService.findOne(id);
    if (order) {
      return { order, message: 'Successfully fetched order' };
    } else {
      return { message: `Order with ID ${id} not found` };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateOrderDto: UpdateOrderDto,
  ) {
    const result = await this.orderService.update(id, updateOrderDto);
    return { result, message: 'Successfully update order' };
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.orderService.remove(id);
    return result;
  }
}
