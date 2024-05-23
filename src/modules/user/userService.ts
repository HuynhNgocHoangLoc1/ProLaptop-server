import { Injectable } from "@nestjs/common";
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


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
