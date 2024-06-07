import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { GetCategoryDto } from './dto/get-category.dto';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { Order } from 'src/common/enum/enum'
import { validate as uuidValidate } from 'uuid';
import { UserNotFoundException } from 'src/common/exception/not-found';


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

  async findAll(params: GetCategoryDto) {
    const category = this.categorysRepository
      .createQueryBuilder('category')
      .select(['category'])
      .skip(params.skip)
      .take(params.take)
      .orderBy('category.createdAt', Order.DESC);
    if (params.search) {
      category.andWhere('category.category ILIKE :category', {
        category: `%${params.search}%`,
      });
    }
    const [result, total] = await category.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(result, pageMetaDto, 'Success');
  }

  async findOneById(id: string) {
    const category = await this.categorysRepository
      .createQueryBuilder('category')
      .select(['category'])
      .where('category.id = :id', { id })
      .getOne();
    return category;
  }


  async update(
    id: string, updateCategoryDto: UpdateCategoryDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    try {
      const category = await this.categorysRepository.findOneBy({ id });
      if (!category) {
        throw new UserNotFoundException();
      }
      category.name = updateCategoryDto.name;
      category.description = updateCategoryDto.description;
  
      await this.entityManager.save(category);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const category = await this.categorysRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
      if (!category) {
        throw new UserNotFoundException();
      }
    await this.categorysRepository.softDelete(id);
    return { data: null, message: 'category deletion successful' };
  }
}
