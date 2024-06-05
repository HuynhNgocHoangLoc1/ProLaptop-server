import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetProductDto } from './dto/get-product.dto';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() imageUrl?: Multer.File,
  ) {
    return this.productService.create(createProductDto, imageUrl);
  }

  @Get()
  async findAll(@Query() params: GetProductDto) {
    return this.productService.findAll(params);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageUrl'))
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
  ) {
    const result = await this.productService.update(id, updateProductDto);
    return { result, message: 'Successfully update product' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
  return this.productService.remove(id);
  }
}
