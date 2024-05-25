import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './userService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar?: Multer.File,
  ) {
    return this.userService.create(createUserDto, avatar);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return { users, message: 'Successfully fetched all users' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (user) {
      return { user, message: 'Successfully fetched user' };
    } else {
      return { message: `User with ID ${id} not found` };
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    @UploadedFile() avatar?: Multer.File,
  ) {
    const result = await this.userService.update(id, updateUserDto, avatar);
    return { result, message: 'Successfully update user' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.userService.remove(id);
    return result;
  }
}
