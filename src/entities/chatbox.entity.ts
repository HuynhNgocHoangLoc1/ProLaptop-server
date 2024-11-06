import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string; // ID của tin nhắn

  @Column()
  content: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiver: User;

  @Column()
  senderRole: string;  // 'user' hoặc 'admin'
}
