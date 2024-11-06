import { Module } from '@nestjs/common';
import { MessageService } from './chatbox.service';
// import { ChatboxController } from './chatbox.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/userService';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Message } from 'src/entities/chatbox.entity';
import { MessageController } from './chatbox.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User]),
  ],
  controllers: [MessageController],
  providers: [MessageService,UserService,CloudinaryService],
})
export class MessageModule {}
