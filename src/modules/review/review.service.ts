import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Review } from 'src/entities/review.entity';

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

  async findAll(): Promise<Review[]> {
    return await this.reviewsRepository.find();
  }

  async findOne(id: string): Promise<Review> {
    return await this.reviewsRepository.findOne({ where: { id } });
  }
  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewsRepository.findOneBy({ id });
    if (review) {
      review.productId = updateReviewDto.productId;
      review.orderId = updateReviewDto.orderId;
      review.rating = updateReviewDto.rating;
      review.comment = updateReviewDto.comment;
      review.date = updateReviewDto.date;
      
      await this.entityManager.save(review);
      return { review, message: 'Successfully update review' };
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.reviewsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`review with ID ${id} not found`);
    }
    return { message: `Successfully removed review #${id}` };
  }
}
