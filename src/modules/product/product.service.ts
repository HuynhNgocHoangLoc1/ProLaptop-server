import { Injectable } from '@nestjs/common';
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
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
