import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatboxService } from './chatbox.service';
import { CreateChatboxDto } from './dto/create-chatbox.dto';

@WebSocketGateway({
  cors: {
    origin: ['https://prolaptop-server.onrender.com'],
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatboxService: ChatboxService) {} // Inject service

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: CreateChatboxDto) { // Đánh dấu là async
    const newMessage = await this.chatboxService.addMessage(body); // Gọi addMessage với await
    console.log(newMessage);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: newMessage,
    });
  }
}
