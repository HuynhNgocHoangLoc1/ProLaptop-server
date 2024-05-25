import { Module } from '@nestjs/common';
import { UserService } from './userService';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, CloudinaryService]
})
export class UserModule {}
