import { AbstractEntity } from 'src/common/entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Product } from './product.entity';
import { Orders } from './order.entity';
import { OrderDetail } from './order-detail.entity';

@Entity()
export class Review extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column()
    orderDetailId: string;

    @Column({ default: 0 })
    rating: number;

    @Column()
    comment: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToOne(() => Product, (product) => product.review)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product: Product;

    @OneToOne(() => OrderDetail, { nullable: true })
    @JoinColumn({ name: 'orderDetailId', referencedColumnName: 'id' })
    orderDetail: OrderDetail;

    constructor(review: Partial<Review>) {
        super();
        Object.assign(this, review);
      }
}
