import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { Order } from 'src/common/enum/enum'
import { validate as uuidValidate } from 'uuid';
import { UserNotFoundException } from 'src/common/exception/not-found';
import { Cart } from 'src/entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { GetCartDto } from './dto/get-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartsRepository: Repository<Cart>,
    private readonly entityManager: EntityManager,
  ) { }
  async create(createCartDto: CreateCartDto) {
    const cart = new Cart(createCartDto);
    await this.entityManager.save(cart);
    return { cart, message: 'Successfully created cart' };
  }

  async findAll(params: GetCartDto) {
    const cartQuery = this.cartsRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product') // Join bảng product
      .skip(params.skip)
      .take(params.take)
      .orderBy('cart.createdAt', Order.DESC);
  
    if (params.search) {
      cartQuery.andWhere('cart.cart ILIKE :cart', {
        cart: `%${params.search}%`,
      });
    }
  
    const [result, total] = await cartQuery.getManyAndCount();
  
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
  
    return new ResponsePaginate(result, pageMetaDto, 'Success');
  }

  async findOneById(id: string) {
    const cart = await this.cartsRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product') // Join product
      .where('cart.id = :id', { id })
      .andWhere('product.id = cart.productId')      // Liên kết productId với product
      .getOne();
  
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
  
    return cart;
  }


  async update(
    id: string, updateCartDto: UpdateCartDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    try {
      const cart = await this.cartsRepository.findOneBy({ id });
      if (!cart) {
        throw new UserNotFoundException();
      }
      cart.userId = updateCartDto.userId;
      cart.productId = updateCartDto.productId;
      cart.quantity = updateCartDto.quantity;
      cart.createdAt = updateCartDto.createdAt;
      cart.updatedAt = updateCartDto.updatedAt;
      await this.entityManager.save(cart);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const cart = await this.cartsRepository
      .createQueryBuilder('cart')
      .where('cart.id = :id', { id })
      .getOne();
      if (!cart) {
        throw new UserNotFoundException();
      }
    await this.cartsRepository.softDelete(id);
    return { data: null, message: 'cart deletion successful' };
  }
}
