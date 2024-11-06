import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { MessageService } from './chatbox.service';
import { UserService } from '../user/userService';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async sendMessage(
    @Body('content') content: string,
    @Body('senderId') senderId: string,
    @Body('receiverId') receiverId: string,
  ) {
    const sender = await this.userService.findOneById(senderId);
    const receiver = await this.userService.findOneById(receiverId);
    return this.messageService.sendMessage(content, sender, receiver);
  }

  @Get('/:userId1/:userId2')
  async getMessages(
    @Param('userId1') userId1: string,
    @Param('userId2') userId2: string,
  ) {
    return this.messageService.getMessagesBetweenUsers(userId1, userId2);
  }

  @Put('/read/:messageId')
  async markMessageAsRead(@Param('messageId') messageId: string) {
    await this.messageService.markMessageAsRead(messageId);
  }

  @Get('')
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }
}