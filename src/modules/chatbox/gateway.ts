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

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, payload: { userId: string }): void {
    if (!payload?.userId) return;

    client.join(payload.userId);
    client.data.userId = payload.userId;
    console.log('Client joined room:', payload.userId);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { senderId: string; receiverId: string; content: string }): void {
    if (!payload?.senderId || !payload?.receiverId || !payload?.content) return;

    // Chỉ gửi cho người nhận để tránh client gửi và nhận cùng một tin nhắn 2 lần
    this.server.to(payload.receiverId).emit('receive_message', payload);
  }
}