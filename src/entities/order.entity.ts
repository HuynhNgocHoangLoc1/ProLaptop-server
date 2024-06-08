import { AbstractEntity } from "../common/entities/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { ShippingAddress } from "./shipping-address.entity";
import { Review } from "./review.entity";

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

    @OneToOne(() => ShippingAddress, { nullable: true })
  @JoinColumn({ name: 'shippingAddressId', referencedColumnName: 'id' })
  address: ShippingAddress;

  @OneToOne(() => Review, { nullable: true })
  @JoinColumn({ name: 'reviewId', referencedColumnName: 'id' })
  review: ShippingAddress;

    constructor(order: Partial<Orders>) {
        super();
        Object.assign(this, order);
      }
    }
