import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('admin/order')
export class AdminOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    try {
      const orders = await this.orderService.findAllOrder(); 
      return { orders, message: 'Successfully fetched all orders' };
    } catch (error) {
      return { message: 'Failed to fetch orders', error: error.message };
    }
  }
}
