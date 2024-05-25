import { GenderEnum, RoleEnum } from '../common/enum/enum';
import { AbstractEntity } from '../common/entities/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  password: string = '123456789';

  @Column()
  email: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: false })
  gender: GenderEnum;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: String;

  @Column({ nullable: true })
  avatar: string =
    'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png';

  // @Column({
  //   type: 'enum',
  //   enum: RoleEnum,
  //   default: RoleEnum.STUDENT,
  //   nullable: false,
  // })
  // role: RoleEnum;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}
