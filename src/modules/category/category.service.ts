import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categorysRepository: Repository<Category>,
    private readonly entityManager: EntityManager,
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category(createCategoryDto);
    await this.entityManager.save(category);
    return { category, message: 'Successfully created category' };
  }

  async findAll(): Promise<Category[]> {
    return await this.categorysRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categorysRepository.findOne({ where: { id } });
  }


  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
