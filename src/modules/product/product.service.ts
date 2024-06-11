import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Multer } from 'multer';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { GetProductDto } from './dto/get-product.dto';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { Order } from 'src/common/enum/enum'
import { ProductNotFoundException, UserNotFoundException } from 'src/common/exception/not-found';
import { validate as uuidValidate } from 'uuid';
import { Review } from 'src/entities/review.entity';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
    private readonly cloudinaryService: CloudinaryService,
  ) { }
  async create(
    createProductDto: CreateProductDto,
    imageUrl?: Multer.File,
  ) {
    const product = new Product(createProductDto);

    if (imageUrl) {
      const imageUrlPicture = await this.uploadAndReturnUrl(imageUrl);
      product.imageUrl = imageUrlPicture;
    }
    await this.entityManager.save(product);
    return { product, message: 'Successfully create product' };
  }

  async findAll(params: GetProductDto) {
    const product = this.productsRepository
      .createQueryBuilder('product')
      .select(['product'])
      .skip(params.skip)
      .take(params.take)
      .orderBy('product.createdAt', Order.DESC);
    if (params.search) {
      product.andWhere('product.product ILIKE :product', {
        product: `%${params.search}%`,
      });
    }
    const [result, total] = await product.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(result, pageMetaDto, 'Success');
  }

  async findOneById(id: string) {
    const product = await this.productsRepository
      .createQueryBuilder('product')
      .select(['product'])
      .where('product.id = :id', { id })
      .getOne();
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, imageUrl?: Multer.File) {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      if (!uuidValidate(id)) {
        throw new BadRequestException('Invalid UUID');
      }
      console.log('image', imageUrl);
      if (imageUrl) {
        await this.deleteOldImageUrl(product);
        product.imageUrl = await this.uploadAndReturnUrl(imageUrl);
      }
      product.name = updateProductDto.name;
      product.description = updateProductDto.description;
      product.categoryId = updateProductDto.categoryId;
      product.price = updateProductDto.price;
      product.stockQuantity = updateProductDto.stockQuantity;
      product.ram = updateProductDto.ram;
      product.cpu = updateProductDto.cpu;
      product.card = updateProductDto.card;
      product.chip = updateProductDto.chip;
      product.hardDrive = updateProductDto.hardDrive;

      await this.entityManager.save(product);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const product = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.review', 'review')
      .where('product.id = :id', { id })
      .getOne();
      if (!uuidValidate(id)) {
        throw new BadRequestException('Invalid UUID');
      }
      if (
        product.review &&
        product.review.length > 0
      ) {
        for (const review of product.review) {
          await this.entityManager.softDelete(Review, {
            id: review.id,
          });
        }
      }
    await this.productsRepository.softDelete(id);
    return { data: null, message: 'product deletion successful' };
  }

  //Cloudinary
  async deleteOldImageUrl(product: Product): Promise<void> {
    if (product.imageUrl) {
      const publicId = this.cloudinaryService.extractPublicIdFromUrl(
        product.imageUrl,
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
