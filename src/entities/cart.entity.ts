import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../common/entities/abstract.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class Cart extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column({ default: 0 })
    quantity: number;

    @Column()
    productId: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;
    
    @ManyToOne(() => Product, (product) => product.cart, { nullable: false }) // Không cho phép giá trị null
  @JoinColumn({ name: 'productId' }) // Cột productId liên kết với bảng Product
  product: Product;
    
    constructor(orderDetail: Partial<Cart>) {
        super();
        Object.assign(this, orderDetail);
      }
}
