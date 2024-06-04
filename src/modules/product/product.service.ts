import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Multer } from 'multer';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

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

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
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
