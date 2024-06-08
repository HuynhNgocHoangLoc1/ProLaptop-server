import { AbstractEntity } from "../common/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders extends AbstractEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    date: Date;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    shippingAddress: string;

    @Column({ default: 0 }) 
    price: number;

    constructor(orders: Partial<Orders>) {
        super();
        Object.assign(this, orders);
      }
}
