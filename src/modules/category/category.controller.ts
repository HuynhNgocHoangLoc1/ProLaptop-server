import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
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
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.categoryService.update(id, updateCategoryDto);
    return { result, message: 'Successfully update category' };
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
  return this.categoryService.remove(id);
  }
}
