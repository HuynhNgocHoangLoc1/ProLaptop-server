import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders} from '../../entities/order.entity';
import { Review } from 'src/entities/review.entity';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { OrderDetail } from 'src/entities/order-detail.entity';
import { ReviewService } from '../review/review.service';
import { Product } from '../../entities/product.entity';
import { Cart } from 'src/entities/cart.entity';
import { User } from 'src/entities/user.entity';
import { AdminOrderController } from './admin-order.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Review, Product, OrderDetail, Cart,User]),
  ],
  controllers: [OrderController, AdminOrderController],
  providers: [OrderService, ReviewService],
})
export class OrderModule {}
