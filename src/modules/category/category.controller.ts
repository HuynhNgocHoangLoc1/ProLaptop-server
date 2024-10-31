import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('iconUrl'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() iconUrl?: Express.Multer.File,
  ) {
    return this.categoryService.create(createCategoryDto, iconUrl);
  }

  @Get('count')
  async getTotalCategoryCount() {
    const totalCount = await this.categoryService.getTotalCategoryCount();
    return {
      total: totalCount,
      message: 'Total category count fetched successfully',
    };
  }
  
  @Get('product-count')
  async getProductCountByCategory() {
    const productCountByCategory =
      await this.categoryService.getProductCountByCategory();
    return {
      message: 'Product count by category fetched successfully',
      data: productCountByCategory,
    };
  }

  @Get()
  async findAll(@Query() params: GetCategoryDto) {
    return this.categoryService.findAll(params);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('iconUrl'))
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() iconUrl: Express.Multer.File,
  ) {
    const result = await this.categoryService.update(
      id,
      updateCategoryDto,
      iconUrl,
    );
    return { result, message: 'Successfully update category' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
