import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  @Get()
  async findAll() {
    const categorys = await this.categoryService.findAll();
    return { categorys, message: 'Successfully fetched all categorys' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    if (category) {
      return { category, message: 'Successfully fetched category' };
    } else {
      return { message: `Category with ID ${id} not found` };
    }
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
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
