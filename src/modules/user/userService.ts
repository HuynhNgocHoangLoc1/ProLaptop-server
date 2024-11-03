import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { Repository, EntityManager } from "typeorm";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { Order, RoleEnum } from 'src/common/enum/enum';
import { PageMetaDto } from "src/common/dtos/pageMeta";
import { ResponsePaginate } from "src/common/dtos/responsePaginate";
import { validate as uuidValidate } from 'uuid';
import { Orders } from "src/entities/order.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly entityManager: EntityManager,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async create(createUserDto: CreateUserDto, avatar?: Express.Multer.File) { // Thay đổi từ Multer.File sang Express.Multer.File
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

    async update(id: string, updateUserDto: UpdateUserDto, avatar?: Express.Multer.File) { // Thay đổi từ Multer.File sang Express.Multer.File
        try {
            const user = await this.usersRepository.findOneBy({ id });
            if (!user) {
                return { message: 'User not found' };
            }

            if (avatar) {
                await this.deleteOldAvatar(user);
                user.avatar = await this.uploadAndReturnUrl(avatar);
            }
            user.userName = updateUserDto.userName;
            user.password = updateUserDto.password;
            user.email = updateUserDto.email;
            user.gender = updateUserDto.gender;
            user.address = updateUserDto.address;
            user.phoneNumber = updateUserDto.phoneNumber;

            await this.entityManager.save(user);
            return { avatar: user.avatar };
        } catch (error) {
            throw error;
        }
    }

    async deleteOldAvatar(user: User): Promise<void> {
        if (user.avatar) {
            const publicId = this.cloudinaryService.extractPublicIdFromUrl(user.avatar);
            await this.cloudinaryService.deleteFile(publicId);
        }
    }

    async uploadAndReturnUrl(file: Express.Multer.File): Promise<string> { // Thay đổi từ Multer.File sang Express.Multer.File
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

        if (user.order && user.order.length > 0) {
            for (const order of user.order) {
                await this.entityManager.softDelete(Orders, { id: order.id });
            }
        }

        await this.usersRepository.softDelete(id);
        return { data: null, message: 'User deletion successful' };
    }

    async getUserCart(userId: string) {
        if (!uuidValidate(userId)) {
            throw new BadRequestException('Invalid UUID');
        }

        const userWithCart = await this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.cart', 'cart')
            .leftJoinAndSelect('cart.product', 'product')
            .where('user.id = :userId', { userId })
            .getOne();

        if (!userWithCart) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return { cart: userWithCart.cart, message: 'Success' };
    }

    async blockUser(userId: string, isBlock: boolean) {
        // console.log('isBlock value:', isBlock);  // In ra giá trị của isBlock
      
        const user = await this.usersRepository.findOne({ where: { id: userId } });
      
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        if (user.role === RoleEnum.ADMIN) {
          throw new BadRequestException('Cannot block admin account');
        }
      
        user.isBlock = isBlock;
        await this.usersRepository.save(user);
      
        return {
          message: isBlock ? 'Block account success!' : 'Unlock account success!',
        };
      }

      async getTotalUserCount(): Promise<number> {
        return await this.usersRepository.count();
    }
    
    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
      }
    
      async saveOtp(userId: string, otp: string): Promise<void> {
        await this.usersRepository.update(userId, {
          otp,
          otpExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 phút hết hạn
        });
      }
      
      async clearOtp(userId: string): Promise<void> {
        await this.usersRepository.update(userId, { otp: null, otpExpires: null });
      }
      
      async updatePassword(userId: string, hashedPassword: string): Promise<void> {
        await this.usersRepository.update(userId, { password: hashedPassword });
      }
      
}
