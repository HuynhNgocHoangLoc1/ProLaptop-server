import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { GetCartDto } from './dto/get-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() createCartDto: CreateCartDto) {
    return await this.cartService.create(createCartDto);
  }

  @Get()
  async findAll(@Query() params: GetCartDto) {
    return this.cartService.findAll(params);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.cartService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCartDto: UpdateCartDto,
  ) {
    const result = await this.cartService.update(id, updateCartDto);
    return { result, message: 'Successfully update cart' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
  return this.cartService.remove(id);
  }

  @Delete('decrease/:userId/:productId')
  async decreaseProductQuantity(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.decreaseQuantity(userId, productId);
  }
}
