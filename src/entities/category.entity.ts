import { AbstractEntity } from "../common/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends AbstractEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    constructor(category: Partial<Category>) {
        super();
        Object.assign(this, category);
      }
}
