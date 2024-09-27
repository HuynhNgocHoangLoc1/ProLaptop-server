 import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrderDto } from './dto/get-order.dto';
import { AuthGuard } from '../auth/utils/auth.guard';
import { RolesGuard } from '../auth/utils/role.middleware';
import { RoleEnum } from 'src/common/enum/enum';
import { PaymentDto } from './dto/payment.dto';

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

  // @Post('/paymentMomo')
  // async makeMomoPayment(@Body() paymentDto: PaymentDto) {
  //   try {
  //     console.log('Received payment request:', paymentDto); // Log dữ liệu nhận được
  //     const payUrl = await this.orderService.paymentMomo(paymentDto);
  //     return { payUrl };
  //   } catch (error) {
  //     console.error('Error making payment:', error); // Log lỗi khi gặp lỗi
  //     throw new HttpException(
  //       'Failed to make payment',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
  @Post('/paymentVnPay')
  async makeVnPayPayment(@Body() paymentDto: PaymentDto) {
    try {
      // console.log('Received VNPay payment request:', paymentDto); // Log dữ liệu nhận được
      const payUrl = await this.orderService.paymentVnPay(paymentDto);
      return { payUrl };
    } catch (error) {
      console.error('Error making VNPay payment:', error); // Log lỗi khi gặp lỗi
      throw new HttpException(
        'Failed to make VNPay payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
}
