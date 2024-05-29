import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { OrderDetail } from 'src/entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
    private readonly entityManager: EntityManager,
  ) { }
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail = new OrderDetail(createOrderDetailDto);
    await this.entityManager.save(orderDetail);
    return { orderDetail, message: 'Successfully created order' };
  }

  async findAll(): Promise<OrderDetail[]> {
    return await this.orderDetailsRepository.find();
  }

  async findOne(id: string): Promise<OrderDetail> {
    return await this.orderDetailsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDetail = await this.orderDetailsRepository.findOneBy({ id });
    if (orderDetail) {
      orderDetail.orderId = updateOrderDetailDto.orderId;
      orderDetail.productId = updateOrderDetailDto.productId;
      orderDetail.quantity = updateOrderDetailDto.quantity;
      orderDetail.price = updateOrderDetailDto.price;
      
      await this.entityManager.save(orderDetail);
      return { orderDetail, message: 'Successfully update orderDetail' };
    }
  }


  async remove(id: string): Promise<{ message: string }> {
    const result = await this.orderDetailsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return { message: `Successfully removed ordeDetail #${id}` };
  }
}
