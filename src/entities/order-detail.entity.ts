import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../common/entities/abstract.entity";

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

    constructor(orderDetail: Partial<OrderDetail>) {
        super();
        Object.assign(this, orderDetail);
      }
}
