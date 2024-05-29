import { Injectable } from '@nestjs/common';
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
  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
