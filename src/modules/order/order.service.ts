import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { GetOrderDto } from './dto/get-order.dto';
import { Orders } from 'src/entities/order.entity';
import {Order} from '../../common/enum/enum'
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { UserNotFoundException } from 'src/common/exception/not-found';
import { validate as uuidValidate } from 'uuid';
import { OrderDetail } from 'src/entities/order-detail.entity';
import { Review } from 'src/entities/review.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    private readonly entityManager: EntityManager,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    const order = new Orders(createOrderDto);
    await this.entityManager.save(order);
    return { order, message: 'Successfully created order' };
  }

  async findAll(params: GetOrderDto) {
    const order = this.ordersRepository
      .createQueryBuilder('order')
      .select(['order'])
      .skip(params.skip)
      .take(params.take)
      .orderBy('order.createdAt', Order.DESC);
    if (params.search) {
      order.andWhere('order.order ILIKE :order', {
        order: `%${params.search}%`,
      });
    }
    const [result, total] = await order.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(result, pageMetaDto, 'Success');
  }

  async findOneById(id: string) {
    const order = await this.ordersRepository
      .createQueryBuilder('order')
      .select(['order'])
      .where('order.id = :id', { id })
      .getOne();
    return order;
  }


  async update(
    id: string, updateOrderDto: UpdateOrderDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    try {
      const order = await this.ordersRepository.findOneBy({ id });
      if (!order) {
        throw new UserNotFoundException();
      }
      order.userId = updateOrderDto.userId;
      order.date = updateOrderDto.date;
      order.name = updateOrderDto.name;
      order.email = updateOrderDto.email;
      order.phoneNumber = updateOrderDto.phoneNumber;
      order.shippingAddress = updateOrderDto.shippingAddress;
      order.price = updateOrderDto.price;
  
      await this.entityManager.save(order);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const order = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetail', 'orderDetail')
      .where('order.id = :id', { id })
      .getOne();
    if (!order) {
      return { message: 'Order not found' };
    }

    const review = await this.reviewsRepository
    .createQueryBuilder('review')
    .where('review.orderId = :id', { id })
    .getOne();

  if (review) {
    await this.reviewsRepository.softDelete(review.id);
  }

    if (order.orderDetail && order.orderDetail.length > 0) {
      for (const orderDetail of order.orderDetail) {
        await this.entityManager.softDelete(OrderDetail, {
          id: orderDetail.id,
        });
      }
    }
    await this.ordersRepository.softDelete(id);
    return { data: null, message: 'Order deletion successful' };
  }
}
