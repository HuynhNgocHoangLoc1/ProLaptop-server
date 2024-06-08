import { AbstractEntity } from 'src/common/entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

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

    @Column()
    date: Date;

    @ManyToOne(() => Product, (product) => product.review)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product: Product;


    constructor(review: Partial<Review>) {
        super();
        Object.assign(this, review);
      }
}
