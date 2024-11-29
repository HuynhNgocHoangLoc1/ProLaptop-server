import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailService } from './order-detail.service';
import { EntityManager, Repository } from 'typeorm';
import { OrderDetail } from '../../entities/order-detail.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { BadRequestException } from '@nestjs/common';
import { UserNotFoundException } from '../../common/exception/not-found';

const mockOrderDetailRepository = {
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

describe('OrderDetailService', () => {
  let service: OrderDetailService;
  let repository: Repository<OrderDetail>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderDetailService,
        {
          provide: EntityManager,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(OrderDetail),
          useValue: mockOrderDetailRepository,
        },
      ],
    }).compile();

    service = module.get<OrderDetailService>(OrderDetailService);
    repository = module.get<Repository<OrderDetail>>(getRepositoryToken(OrderDetail));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order detail successfully', async () => {
      const createOrderDetailDto: CreateOrderDetailDto = {
        orderId: '1',
        productId: '1',
        quantity: 2,
        price: 100,
      };
      mockOrderDetailRepository.save.mockResolvedValue(createOrderDetailDto);
      const result = await service.create(createOrderDetailDto);
      expect(result).toEqual({ orderDetail: createOrderDetailDto, message: 'Successfully created order' });
    });
  });

  describe('findOneById', () => {
    it('should return an order detail by id', async () => {
      const id = '1';
      const orderDetail = { id, orderId: '1', productId: '1', quantity: 2, price: 100 };
      mockOrderDetailRepository.createQueryBuilder().getOne.mockResolvedValue(orderDetail);
      const result = await service.findOneById(id);
      expect(result).toEqual(orderDetail);
    });
  });

  describe('update', () => {
    it('should throw BadRequestException if id is invalid', async () => {
      await expect(service.update('invalid-uuid', new UpdateOrderDetailDto())).rejects.toThrow(BadRequestException);
    });

   
  });

  describe('remove', () => {
    it('should throw BadRequestException if id is invalid', async () => {
      await expect(service.remove('invalid-uuid')).rejects.toThrow(BadRequestException);
    });



    
  });
});