import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ValidationPipe, Query } from '@nestjs/common';
import { UserService } from './userService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar?: Express.Multer.File, // Thay đổi từ Multer.File sang Express.Multer.File
  ) {
    return this.userService.create(createUserDto, avatar);
  }

  @Get()
  async findAll(@Query() params: GetUserDto) {
    return this.userService.findAll(params);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File, // Thay đổi từ Multer.File sang Express.Multer.File
  ) {
    const result = await this.userService.update(id, updateUserDto, avatar);
    return { result, message: 'Successfully update user' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get(':id/carts')
  async getCartsByUserId(@Param('id') userId: string) {
    return await this.userService.getUserCart(userId);
  }
}
