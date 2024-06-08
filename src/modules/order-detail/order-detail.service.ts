import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { OrderDetail } from 'src/entities/order-detail.entity';
import { GetOrderDetailDto } from './dto/get-order-detail.dto';
import { Order } from 'src/common/enum/enum'
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { validate as uuidValidate } from 'uuid';
import { UserNotFoundException } from 'src/common/exception/not-found';


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

  async findAll(params: GetOrderDetailDto) {
    const orderDetail = this.orderDetailsRepository
      .createQueryBuilder('orderDetail')
      .select(['orderDetail'])
      .skip(params.skip)
      .take(params.take)
      .orderBy('orderDetail.createdAt', Order.DESC);
    if (params.search) {
      orderDetail.andWhere('orderDetail.orderDetail ILIKE :orderDetail', {
        orderDetail: `%${params.search}%`,
      });
    }
    const [result, total] = await orderDetail.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(result, pageMetaDto, 'Success');
  }

  async findOneById(id: string) {
    const orderDetail = await this.orderDetailsRepository
      .createQueryBuilder('orderDetail')
      .select(['orderDetail'])
      .where('orderDetail.id = :id', { id })
      .getOne();
    return orderDetail;
  }

  async update(
    id: string, updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    try {
      const orderDetail = await this.orderDetailsRepository.findOneBy({ id });
      if (!orderDetail) {
        throw new UserNotFoundException();
      }
      orderDetail.orderId = updateOrderDetailDto.orderId;
      orderDetail.productId = updateOrderDetailDto.productId;
      orderDetail.quantity = updateOrderDetailDto.quantity;
      orderDetail.price = updateOrderDetailDto.quantity;

      await this.entityManager.save(orderDetail);
    } catch (error) {
      throw error;
    }
  }


  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const orderDetail = await this.orderDetailsRepository
      .createQueryBuilder('orderDetail')
      .where('orderDetail.id = :id', { id })
      .getOne();
      if (!orderDetail) {
        throw new UserNotFoundException();
      }
    await this.orderDetailsRepository.softDelete(id);
    return { data: null, message: 'orderDetail deletion successful' };
  }
}
