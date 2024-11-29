// review.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

const mockReviewService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOneById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  getTotalReviewCount: jest.fn(),
};

describe('ReviewController', () => {
  let controller: ReviewController;
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: mockReviewService,
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a review', async () => {
      const createReviewDto: CreateReviewDto = {
        productId: '1',
        orderDetailId: '1',
        rating: 5,
        comment: 'Great product!',
      };
      mockReviewService.create.mockResolvedValue({ review: createReviewDto, message: 'Successfully created review' });
      const result = await controller.create(createReviewDto);
      expect(result).toEqual({ review: createReviewDto, message: 'Successfully created review' });
    });
  });

  describe('getTotalReviewCount', () => {
    it('should return the total review count', async () => {
      mockReviewService.getTotalReviewCount.mockResolvedValue(10);
      const result = await controller.getTotalReviewCount();
      expect(result).toEqual({ total: 10, message: 'Total review count fetched successfully' });
    });
  });
});
