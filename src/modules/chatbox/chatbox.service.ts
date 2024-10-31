import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatboxDto } from './dto/create-chatbox.dto';
import { Chatbox } from 'src/entities/chatbox.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/userService';

@Injectable()
export class ChatboxService {
  constructor(
    @InjectRepository(Chatbox) // Tiêm repository cho Chatbox
    private readonly chatboxRepository: Repository<Chatbox>,
    private readonly userService: UserService,
  ) {}

  // Phương thức để thêm tin nhắn mới
  async addMessage(createChatboxDto: CreateChatboxDto) {
    // Tìm kiếm người dùng bằng userId
    const user = await this.userService.findOneById(createChatboxDto.userId);

    if (!user) {
      throw new Error('User not found'); // Ném lỗi nếu không tìm thấy người dùng
    }

    // Tạo một bản ghi tin nhắn mới với thông tin người dùng
    const newMessage = this.chatboxRepository.create({
      ...createChatboxDto,
      user: user, // Thiết lập user liên kết với tin nhắn
    });

    return await this.chatboxRepository.save(newMessage); // Lưu vào cơ sở dữ liệu
  }

  // Phương thức để lấy tất cả tin nhắn
  async getAllMessages() {
    return this.chatboxRepository.find({ relations: ['user'] }); // Lấy tất cả tin nhắn và thông tin người dùng
  }
}
