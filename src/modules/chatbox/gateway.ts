import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// CORS của socket được cấu hình trong SocketIoAdapter (đọc từ env CLIENT_URL)
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { senderId: string, receiverId: string, content: string }): void {
    // Phát tin nhắn tới client khi nhận được từ người gửi
    this.server.emit('receive_message', payload);
  }
}