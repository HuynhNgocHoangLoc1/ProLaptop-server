import { AbstractEntity } from 'src/common/entities';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

    constructor(review: Partial<Review>) {
        super();
        Object.assign(this, review);
      }
}
