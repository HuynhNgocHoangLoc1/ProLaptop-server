import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrderDto } from './dto/get-order.dto';
import { AuthGuard } from '../auth/utils/auth.gruad';
import { RolesGuard } from '../auth/utils/role.middleware';
import { RoleEnum } from 'src/common/enum/enum';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

 
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }


  @Get()
  @UseGuards(AuthGuard, new RolesGuard([RoleEnum.USER, RoleEnum.ADMIN]))
  async findAll(@Query() params: GetOrderDto) {
    return this.orderService.findAll(params);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.orderService.findOneById(id);
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
  return this.orderService.remove(id);
  }
}
