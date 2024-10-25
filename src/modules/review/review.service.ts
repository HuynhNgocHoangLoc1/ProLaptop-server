import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Review } from 'src/entities/review.entity';
import { GetReviewDto } from './dto/get-review.dto';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { Order } from 'src/common/enum/enum'
import { validate as uuidValidate } from 'uuid';
import { UserNotFoundException } from 'src/common/exception/not-found';



@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    private readonly entityManager: EntityManager,
  ) { }
  async create(createReviewDto: CreateReviewDto) {
    const review = new Review(createReviewDto);
    await this.entityManager.save(review);
    return { review, message: 'Successfully created review' };
  }

  async findAll(params: GetReviewDto) {
    const review = this.reviewsRepository
      .createQueryBuilder('review')
      .select(['review'])
      .skip(params.skip)
      .take(params.take)
      .orderBy('review.createdAt', Order.DESC);
    if (params.search) {
      review.andWhere('review.review ILIKE :review', {
        review: `%${params.search}%`,
      });
    }
    const [result, total] = await review.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(result, pageMetaDto, 'Success');
  }

  async findOneById(id: string) {
    const review = await this.reviewsRepository
      .createQueryBuilder('review')
      .select(['review'])
      .where('review.id = :id', { id })
      .getOne();
    return review;
  }
  
  async update(
    id: string, updateReviewDto: UpdateReviewDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    try {
      const review = await this.reviewsRepository.findOneBy({ id });
      if (!review) {
        throw new UserNotFoundException();
      }
      review.productId  = updateReviewDto.productId ;
      review.orderDetailId = updateReviewDto.orderDetailId;
      review.rating = updateReviewDto.rating;
      review.comment = updateReviewDto.comment;
      await this.entityManager.save(review);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const review = await this.reviewsRepository
      .createQueryBuilder('review')
      .where('review.id = :id', { id })
      .getOne();
      if (!review) {
        throw new UserNotFoundException();
      }
    await this.reviewsRepository.softDelete(id);
    return { data: null, message: 'review deletion successful' };
  }
}
