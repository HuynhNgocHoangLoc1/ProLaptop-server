import { AbstractEntity } from 'src/common/entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Product } from './product.entity';
import { Orders } from './order.entity';

@Entity()
export class Review extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column()
    orderId: string;

    @Column({ default: 0 })
    rating: number;

    @Column()
    comment: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToOne(() => Product, (product) => product.review)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product: Product;

    @OneToOne(() => Orders, { nullable: true })
    @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
    order: Orders;

    constructor(review: Partial<Review>) {
        super();
        Object.assign(this, review);
      }
}
