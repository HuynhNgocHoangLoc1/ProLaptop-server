import { AbstractEntity } from "../common/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShippingAddress extends AbstractEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    district: string;

    @Column()
    address: string;

    @Column()
    city: string;

    constructor(shippingAddress: Partial<ShippingAddress>) {
        super();
        Object.assign(this, shippingAddress);
      }
}
