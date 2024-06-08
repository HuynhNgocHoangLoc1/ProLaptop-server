import { AbstractEntity } from "../common/entities/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

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

    @ManyToOne(() => User, (user) => user.order)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

    constructor(order: Partial<Orders>) {
        super();
        Object.assign(this, order);
      }
}
