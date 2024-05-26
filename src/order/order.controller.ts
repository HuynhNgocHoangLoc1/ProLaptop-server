import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

 
  @Post()
  async create(@Body() createUserDto: CreateOrderDto) {
    return this.orderService.create(createUserDto);
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
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
