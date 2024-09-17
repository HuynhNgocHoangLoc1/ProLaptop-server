import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { CartController } from './cart.controller';
import { Cart } from 'src/entities/cart.entity';
import { CartService } from './cart.service';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart,Product,Category]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
