import { Module } from '@nestjs/common';
import { ChatboxService } from './chatbox.service';
// import { ChatboxController } from './chatbox.controller';
import { MyGateway } from './gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatbox } from 'src/entities/chatbox.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/userService';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chatbox, User]),
  ],
  // controllers: [ChatboxController],
  providers: [ChatboxService,MyGateway,UserService,CloudinaryService],
})
export class ChatboxModule {}
