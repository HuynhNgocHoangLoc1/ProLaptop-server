import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { ShippingAddress } from 'src/entities/shipping-address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { Order } from 'src/common/enum/enum'
import { GetShippingAddressDto } from './dto/get-shipping-address.dto';
import { validate as uuidValidate } from 'uuid';
import { UserNotFoundException } from 'src/common/exception/not-found';

@Injectable()
export class ShippingAddressService {
 
  constructor(
    @InjectRepository(ShippingAddress)
    private readonly shippingAddressRepository: Repository<ShippingAddress>,
    private readonly entityManager: EntityManager,
  ) { }
  async create(createShippingAddressDto: CreateShippingAddressDto) {
    const shippingAddress = new ShippingAddress(createShippingAddressDto);
    await this.entityManager.save(shippingAddress);
    return { shippingAddress, message: 'Successfully created shippingAddress' };
  }

  async findAll(params: GetShippingAddressDto) {
    const shippingAddress = this.shippingAddressRepository
      .createQueryBuilder('shippingAddress')
      .select(['shippingAddress'])
      .skip(params.skip)
      .take(params.take)
      .orderBy('shippingAddress.createdAt', Order.DESC);
    if (params.search) {
      shippingAddress.andWhere('shippingAddress.shippingAddress ILIKE :shippingAddress', {
        shippingAddress: `%${params.search}%`,
      });
    }
    const [result, total] = await shippingAddress.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(result, pageMetaDto, 'Success');
  }

  async findOneById(id: string) {
    const shippingAddress = await this.shippingAddressRepository
      .createQueryBuilder('shippingAddress')
      .select(['shippingAddress'])
      .where('shippingAddress.id = :id', { id })
      .getOne();
    return shippingAddress;
  }
  async update(
  id: string, updateShippingAddressDto: UpdateShippingAddressDto,
) {
  if (!uuidValidate(id)) {
    throw new BadRequestException('Invalid UUID');
  }
  try {
    const shippingAddress = await this.shippingAddressRepository.findOneBy({ id });
    if (!shippingAddress) {
      throw new UserNotFoundException();
    }
    shippingAddress.district = updateShippingAddressDto.district;
    shippingAddress.address = updateShippingAddressDto.address;
    shippingAddress.city = updateShippingAddressDto.city;

    await this.entityManager.save(shippingAddress);
  } catch (error) {
    throw error;
  }
}

async remove(id: string) {
  if (!uuidValidate(id)) {
    throw new BadRequestException('Invalid UUID');
  }
  const shippingAddress = await this.shippingAddressRepository
    .createQueryBuilder('shippingAddress')
    .where('shippingAddress.id = :id', { id })
    .getOne();
    if (!shippingAddress) {
      throw new UserNotFoundException();
    }
  await this.shippingAddressRepository.softDelete(id);
  return { data: null, message: 'shippingAddress deletion successful' };
}
}
