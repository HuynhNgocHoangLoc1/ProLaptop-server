import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { MessageService } from './chatbox.service';
  
  @WebSocketGateway({ cors: true }) 
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(private readonly messageService: MessageService) {}
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(
      client: Socket,
      payload: { content: string; senderId: string; receiverId: string },
    ) {
      const { content, senderId, receiverId } = payload;
      const message = await this.messageService.createMessage(content, senderId, receiverId);
  
      // Gửi tin nhắn đến client cụ thể bằng cách kiểm tra ID của họ
      this.server.to(receiverId).emit('newMessage', message); // gửi đến receiverId
      client.emit('newMessage', message); // gửi lại cho người gửi xác nhận tin nhắn
    }
  }
  