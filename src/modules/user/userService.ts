import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Multer } from 'multer';
import { User } from "../../entities/user.entity";
import { Repository, EntityManager } from "typeorm";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  async create(createUserDto: CreateUserDto, avatar?: Multer.File) {
    const user = new User(createUserDto);

    if (avatar) {
      const avatarUrl = await this.uploadAndReturnUrl(avatar);
      user.avatar = avatarUrl;
    }
    await this.entityManager.save(user);
    return { user, message: 'Successfully create user' };
  }


  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }


  async update(id: string, updateUserDto: UpdateUserDto, avatar?: Multer.File) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        return { message: 'User not found' };
      }
      console.log('ava', avatar);
      if (avatar) {
        await this.deleteOldAvatar(user);
        user.avatar = await this.uploadAndReturnUrl(avatar);
      }
      user.userName = updateUserDto.userName;
      user.password = updateUserDto.password;
      user.email = updateUserDto.email;
      user.gender = updateUserDto.gender;
      user.address = updateUserDto.address;
      user.phone = updateUserDto.phone;

      await this.entityManager.save(user);
    } catch (error) {
      throw error;
    }
  }
  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.deleteOldAvatar(user);
    await this.usersRepository.remove(user);
    return { message: 'Successfully removed user' };
  }

 

  async deleteOldAvatar(user: User): Promise<void> {
    if (user.avatar) {
      const publicId = this.cloudinaryService.extractPublicIdFromUrl(
        user.avatar
      );
      await this.cloudinaryService.deleteFile(publicId);
    }
  }

  async uploadAndReturnUrl(file: Multer.File): Promise<string> {
    try {
      const result = await this.cloudinaryService.uploadImageFile(file);
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  }
}
