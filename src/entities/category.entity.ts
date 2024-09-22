import { AbstractEntity } from "../common/entities/abstract.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Category extends AbstractEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({nullable: true})
    iconUrl: string =
    'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png';

    @OneToMany(() => Product, (product) => product.category, {
      cascade: true,
      onUpdate: 'CASCADE',
    })
    product: Product[];

    constructor(category: Partial<Category>) {
        super();
        Object.assign(this, category);
      }
}
