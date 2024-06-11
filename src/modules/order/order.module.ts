import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders} from '../../entities/order.entity';
import { Review } from 'src/entities/review.entity';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { OrderDetail } from 'src/entities/order-detail.entity';
import { ReviewService } from '../review/review.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Review]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ReviewService],
})
export class OrderModule {}
