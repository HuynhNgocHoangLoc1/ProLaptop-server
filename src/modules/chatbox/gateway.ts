// import { OnModuleInit } from '@nestjs/common';
// import {
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { ChatboxService } from './chatbox.service';
// import { CreateChatboxDto } from './dto/create-chatbox.dto';

// @WebSocketGateway({
//   cors: {
//     origin: ['https://prolaptop-server.onrender.com'],
//   },
// })
// export class MyGateway implements OnModuleInit {
//   @WebSocketServer()
//   server: Server;

//   constructor(private readonly chatboxService: ChatboxService) {} // Inject service

//   onModuleInit() {
//     this.server.on('connection', (socket) => {
//       console.log(`User connected: ${socket.id}`);
      
//       socket.on('joinRoom', (userId) => {
//         socket.join(userId);
//         console.log(`User ${socket.id} joined room: ${userId}`);
//       });
//     });
//   }
  
//   @SubscribeMessage('newMessage')
//   async onNewMessage(@MessageBody() body: CreateChatboxDto) {
//     const newMessage = await this.chatboxService.addMessage(body);
//     const roomId = body.userId; // room ID là userId
  
//     // Phát tin nhắn mới trong phòng của user đó
//     this.server.to(roomId).emit('onMessage', {
//       msg: 'New Message',
//       content: newMessage,
//     });
//   }
  
// }
