import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './userService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUserDto } from './dto/get-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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

  @Get('count')
  async getTotalUserCount() {
    const totalCount = await this.userService.getTotalUserCount();
    return {
      total: totalCount,
      message: 'Total user count fetched successfully',
    };
  }

  @Get('admin')
  async findAdmin() {
    const admin = await this.userService.findAdminUser();
    if (!admin) {
      throw new NotFoundException('Admin user not found');
    }
    return admin;
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

  @Patch(':id/password')
  async changePassword(
    @Param('id') id: string,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ) {
    await this.userService.changePassword(
      id,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );
    return { message: 'Password updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get(':id/carts')
  async getCartsByUserId(@Param('id') userId: string) {
    return await this.userService.getUserCart(userId);
  }

  @Post('block/:userId')
  async blockUser(@Param('userId') userId: string, @Body() body: any) {
    // console.log('Request body:', body);
    const { isBlock } = body;
    // console.log('Received isBlock:', isBlock);
    return this.userService.blockUser(userId, isBlock);
  }


}
