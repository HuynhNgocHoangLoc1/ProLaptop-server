import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { Orders } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderDetail extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  price: number;

  @ManyToOne(() => Orders, (order) => order.orderDetail)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order: Orders;

  @ManyToOne(() => Product, (product) => product.orderDetail)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product;

  constructor(orderDetail: Partial<OrderDetail>) {
    super();
    Object.assign(this, orderDetail);
  }
}
