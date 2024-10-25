import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { Orders } from './order.entity';
import { Product } from './product.entity';
import { Review } from './review.entity';

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

  @OneToOne(() => Review, (review) => review.orderDetail, { nullable: true })
  review: Review;

  constructor(orderDetail: Partial<OrderDetail>) {
    super();
    Object.assign(this, orderDetail);
  }
}
