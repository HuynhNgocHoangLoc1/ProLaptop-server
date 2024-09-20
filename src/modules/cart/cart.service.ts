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
import { Product } from 'src/entities/product.entity';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartsRepository: Repository<Cart>,
    private readonly entityManager: EntityManager,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }
  async create(createCartDto: CreateCartDto) {
    const { userId, productId, quantity } = createCartDto;

    // Lấy thông tin sản phẩm từ Product repository
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Kiểm tra nếu số lượng yêu cầu vượt quá stock của sản phẩm
    if (quantity > product.stockQuantity) {
      throw new BadRequestException(
        `Cannot add to cart. Only ${product.stockQuantity} items are in stock.`,
      );
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng của user hay chưa
    const existingCartItem = await this.cartsRepository.findOne({
      where: { userId, productId },
    });

    if (existingCartItem) {
      // Nếu sản phẩm đã tồn tại trong cart, cộng thêm quantity
      const newQuantity = existingCartItem.quantity + quantity;

      // Kiểm tra xem số lượng mới có vượt quá stock hay không
      if (newQuantity > product.stockQuantity) {
        throw new BadRequestException(
          `Cannot add to cart. Only ${product.stockQuantity - existingCartItem.quantity} items can be added.`,
        );
      }

      existingCartItem.quantity = newQuantity;
      await this.cartsRepository.save(existingCartItem);

      return {
        message: 'Quantity updated successfully',
        cart: existingCartItem,
      };
    }

    // Nếu sản phẩm chưa tồn tại, tạo mới
    const newCartItem = this.cartsRepository.create({
      userId,
      productId,
      quantity,
    });
    await this.cartsRepository.save(newCartItem);

    return {
      message: 'Product added to cart successfully',
      cart: newCartItem,
    };
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

      await this.entityManager.save(cart);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.cartsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return { message: `Successfully removed cart #${id}` };
  }
  

  async decreaseQuantity(userId: string, productId: string) {
    // Kiểm tra xem sản phẩm có trong giỏ hàng hay không
    const existingCartItem = await this.cartsRepository.findOne({
      where: { userId, productId },
    });

    if (!existingCartItem) {
      throw new NotFoundException('Product not found in the cart');
    }

    // Giảm số lượng sản phẩm
    if (existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1;
      await this.cartsRepository.save(existingCartItem);

      return {
        message: 'Quantity decreased successfully',
        cart: existingCartItem,
      };
    } else {
      // Nếu số lượng là 1, xoá sản phẩm khỏi giỏ hàng
      await this.cartsRepository.remove(existingCartItem);

      return {
        message: 'Product removed from cart',
      };
    }
  }
}
