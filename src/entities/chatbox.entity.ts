import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chatbox {
  @PrimaryGeneratedColumn('uuid')
  id: string; // ID của tin nhắn

  @Column()
  userId: string; 

  @Column()
  content: string; // Nội dung của tin nhắn

  @CreateDateColumn()
  createdAt: Date; // Thời gian gửi tin nhắn

  @ManyToOne(() => User, (user) => user.chatbox, {
    onDelete: 'CASCADE', // Nếu người dùng bị xóa, các tin nhắn của họ cũng sẽ bị xóa
  })
  @JoinColumn({ name: 'userId' })
  user: User; // Tham chiếu tới user gửi tin nhắn

  constructor(chatbox: Partial<Chatbox>) {
    Object.assign(this, chatbox);
  }
}
