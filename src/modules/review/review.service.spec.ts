import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { EntityManager, Repository } from 'typeorm';
import { Review } from '../../entities/review.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { BadRequestException } from '@nestjs/common';
import { UserNotFoundException } from '../../common/exception/not-found';

const mockReviewRepository = {
  save: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
    getManyAndCount: jest.fn(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
  }),
  findOneBy: jest.fn(),
  count: jest.fn(),
  softDelete: jest.fn(),
};

describe('ReviewService', () => {
  let service: ReviewService;
  let repository: Repository<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
    ReviewService,
    {
    provide: EntityManager,
    useValue: {
    save: jest.fn(),
    },
    },
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    repository = module.get<Repository<Review>>(getRepositoryToken(Review));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a review successfully', async () => {
      const createReviewDto: CreateReviewDto = {
        productId: '1',
        orderDetailId: '1',
        rating: 5,
        comment: 'Great product!',
      };
      mockReviewRepository.save.mockResolvedValue(createReviewDto);
      const result = await service.create(createReviewDto);
      expect(result).toEqual({ review: createReviewDto, message: 'Successfully created review' });
    });
  });

  describe('findOneById', () => {
    it('should return a review by id', async () => {
      const id = '1';
      const review = { id, productId: '1', rating: 5, comment: 'Great product!' };
      mockReviewRepository.createQueryBuilder().getOne.mockResolvedValue(review);
      const result = await service.findOneById(id);
      expect(result).toEqual(review);
    });
  });

  describe('update', () => {
    it('should throw BadRequestException if id is invalid', async () => {
  await expect(service.update('invalid-uuid', new UpdateReviewDto())).rejects.toThrow(BadRequestException);
});

  
  });

  describe('remove', () => {
    it('should throw BadRequestException if id is invalid', async () => {
      await expect(service.remove('invalid-uuid')).rejects.toThrow(BadRequestException);
    });
  
  });
});