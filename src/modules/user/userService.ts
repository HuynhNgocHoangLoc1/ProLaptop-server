import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Multer } from 'multer';
import { User } from "../../entities/user.entity";
import { Repository, EntityManager } from "typeorm";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { Order } from 'src/common/enum/enum'
import { PageMetaDto } from "src/common/dtos/pageMeta";
import { ResponsePaginate } from "src/common/dtos/responsePaginate";
import { validate as uuidValidate } from 'uuid';
import { ProductNotFoundException } from "src/common/exception/not-found";
import { Orders } from "src/entities/order.entity";
import {Cart} from 'src/entities/cart.entity'
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


  async findAll(params: GetUserDto) {
    const user = this.usersRepository
      .createQueryBuilder('user')
      .select(['user'])
      .skip(params.skip)
      .take(params.take)
      .orderBy('user.createdAt', Order.DESC);
    if (params.search) {
      user.andWhere('user.user ILIKE :user', {
        user: `%${params.search}%`,
      });
    }
    const [result, total] = await user.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(result, pageMetaDto, 'Success');
  }

  async findOneById(id: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .select(['user'])
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, avatar?: Multer.File) {
    // Kiểm tra UUID trước
    if (!uuidValidate(id)) {
        throw new BadRequestException('Invalid UUID');
    }

    let user;
    try {
        user = await this.usersRepository.findOneBy({ id });

        // Kiểm tra xem user có tồn tại không
        if (!user) {
            throw new NotFoundException('User not found');
        }

        console.log('avatar', avatar);

        if (avatar) {
            await this.deleteOldAvatar(user);
            user.avatar = await this.uploadAndReturnUrl(avatar);
        }

        // Cập nhật các thuộc tính khác của người dùng
        user.userName = updateUserDto.userName;
        user.password = updateUserDto.password;
        user.email = updateUserDto.email; 
        user.gender = updateUserDto.gender;
        user.address = updateUserDto.address;
        user.phoneNumber = updateUserDto.phoneNumber;
        user.role = updateUserDto.role;

        // Lưu người dùng
        await this.entityManager.save(user);
    } catch (error) {
        console.error('Error updating user:', error);
        throw new InternalServerErrorException('Failed to update user');
    }

    // Kiểm tra avatar
    if (!user.avatar) {
        throw new InternalServerErrorException('Avatar not found after upload');
    }

    // Trả về thông tin người dùng cùng với URL của avatar
    return { 
        user, 
        message: 'User update successful', 
        avatarUrl: user.avatar 
    };
}

  //Cloudinary
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

  async remove(id: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.order', 'order')
      .where('user.id = :id', { id })
      .getOne();
      if (!uuidValidate(id)) {
        throw new BadRequestException('Invalid UUID');
      }
      if (
        user.order &&
        user.order.length > 0
      ) {
        for (const order of user.order) {
          await this.entityManager.softDelete(Orders, {
            id: order.id,
          });
        }
      }
    await this.usersRepository.softDelete(id);
    return { data: null, message: 'user deletion successful' };
  }

  async getUserCart(userId: string) {
    if (!uuidValidate(userId)) {
      throw new BadRequestException('Invalid UUID');
    }
  
    const userWithCart = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.cart', 'cart')
      .leftJoinAndSelect('cart.product', 'product') // lấy thông tin sản phẩm
      .where('user.id = :userId', { userId })
      .getOne();
  
    if (!userWithCart) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    return { cart: userWithCart.cart, message: 'Success' };
  }
}
