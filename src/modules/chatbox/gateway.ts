import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'https://prolaptop-server.onrender.com', // URL của FE (cập nhật đúng với URL của bạn)
    credentials: true, // Nếu bạn cần cookie hoặc thông tin xác thực
  },
})
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