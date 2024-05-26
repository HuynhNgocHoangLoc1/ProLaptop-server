import { AbstractEntity } from "src/common/entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order extends AbstractEntity{
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
    address: string;

    @Column()
    price: string;

    constructor(order: Partial<Order>) {
        super();
        Object.assign(this, order);
      }
}
