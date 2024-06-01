import { Injectable } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { ShippingAddress } from 'src/entities/shipping-address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ShippingAddressService {
  constructor(
    @InjectRepository(ShippingAddress)
    private readonly shippignAddressRepository: Repository<ShippingAddress>,
    private readonly entityManager: EntityManager,
  ) { }
  async create(createShippingAddressDto: CreateShippingAddressDto) {
    const shippingAddress = new ShippingAddress(createShippingAddressDto);
    await this.entityManager.save(shippingAddress);
    return { shippingAddress, message: 'Successfully created shippingAddress' };
  }

  findAll() {
    return `This action returns all shippingAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shippingAddress`;
  }

  update(id: number, updateShippingAddressDto: UpdateShippingAddressDto) {
    return `This action updates a #${id} shippingAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippingAddress`;
  }
}
