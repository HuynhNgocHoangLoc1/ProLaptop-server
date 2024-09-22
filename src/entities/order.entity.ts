import { AbstractEntity } from "../common/entities/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Review } from "./review.entity";
import { OrderDetail } from "./order-detail.entity";
import {PaymentMethod, StatusDelivery } from "../common/enum/enum";

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
    
    @Column ({type: "enum", enum: PaymentMethod,nullable: true})
    paymentMethod: PaymentMethod

    @Column ({type: "enum", enum: StatusDelivery, nullable: true})
    statusDelivery: StatusDelivery

    @ManyToOne(() => User, (user) => user.order)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;


  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  orderDetail: OrderDetail[];

    constructor(order: Partial<Orders>) {
        super();
        Object.assign(this, order);
      }
    }
