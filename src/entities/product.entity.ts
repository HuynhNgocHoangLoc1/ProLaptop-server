
import { AbstractEntity } from "../common/entities/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./order-detail.entity";
import { Review } from "./review.entity";
import { Category } from "./category.entity";

@Entity()
export class Product extends AbstractEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column()
    categoryId: string;
    
    @Column({default: 0})
    price: number;
    
    @Column()
    stockQuantity: number;
    
    @Column({ nullable: true })
    imageUrl: string = 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png';
    
    @Column()
    ram: string;
    
    @Column()
    cpu: string;
    
    @Column()
    card: string;
    
    @Column()
    chip: string;
    
    @Column()
    hardDrive: string;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product, {
      cascade: true,
      onUpdate: 'CASCADE',
    })
    orderDetail: OrderDetail[];

    @OneToMany(() => Review, (review) => review.product, {
      cascade: true,
      onUpdate: 'CASCADE',
    })
    review: Review[];

    @ManyToOne(() => Category, (category) => category.product)
    @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
    category: Category;

    constructor(product: Partial<Product>) {
        super();
        Object.assign(this, product);
      }
}
