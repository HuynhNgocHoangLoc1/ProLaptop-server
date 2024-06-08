import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders} from '../../entities/order.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
