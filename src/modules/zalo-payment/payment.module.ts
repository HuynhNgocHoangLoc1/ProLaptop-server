import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZaloPaymentController } from './zaloPayment.controller';
import { Orders } from '../../entities/order.entity';
import { Cart } from '../../entities/cart.entity';
import { User } from '../../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ZaloPaymentService } from './zaloPament.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { OrderService } from '../order/order.service';
import { Review } from '../../entities/review.entity';
import { OrderDetail } from '../../entities/order-detail.entity';
import { RolesGuard } from '../auth/utils/role.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Cart, User, Review, OrderDetail])],
  controllers: [ZaloPaymentController],
  providers: [ZaloPaymentService, OrderService],
})
export class PaymentModule{}
