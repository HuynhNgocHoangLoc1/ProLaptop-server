import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { Order} from '../../entities/order.entity'
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly entityManager: EntityManager,
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    const order = new Order(createOrderDto);
    await this.entityManager.save(order);
    return { order, message: 'Successfully created order' };
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    return await this.ordersRepository.findOne({ where: { id } });
  }


  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.findOneBy({ id });
    if (order) {
      order.userId = updateOrderDto.userId;
      order.date = updateOrderDto.date;
      order.name = updateOrderDto.name;
      order.email = updateOrderDto.email;
      order.phoneNumber = updateOrderDto.phoneNumber;
      order.address = updateOrderDto.address;
      order.price = updateOrderDto.price;
      await this.entityManager.save(order);
      return { order, message: 'Successfully update magazine' };
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.ordersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return { message: `Successfully removed order #${id}` };
  }
}
