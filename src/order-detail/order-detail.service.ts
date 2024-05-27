import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { OrderDetail } from 'src/entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly ordersRepository: Repository<OrderDetail>,
    private readonly entityManager: EntityManager,
  ) { }
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail = new OrderDetail(createOrderDetailDto);
    await this.entityManager.save(orderDetail);
    return { orderDetail, message: 'Successfully created order' };
  }

  findAll() {
    return `This action returns all orderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
