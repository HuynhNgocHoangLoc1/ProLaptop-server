// src/messages/message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/chatbox.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(content: string, sender: User, receiver: User): Promise<Message> {
    const message = this.messageRepository.create({
      content,
      sender,
      receiver,
      senderRole: sender.role,
    });
    return this.messageRepository.save(message);
  }
  

  async getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: [
        { sender: { id: userId1 }, receiver: { id: userId2 } },
        { sender: { id: userId2 }, receiver: { id: userId1 } },
      ],
      order: { timestamp: 'ASC' },
    });
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    await this.messageRepository.update(messageId, { isRead: true });
  }

  async getAllMessages(): Promise<Message[]> {
    return await this.messageRepository.find({ relations: ['sender', 'receiver'] });
  }
}