import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { GetOrderDetailDto } from './dto/get-order-detail.dto';

const mockOrderDetailService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOneById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('OrderDetailController', () => {
  let controller: OrderDetailController;
  let service: OrderDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderDetailController],
      providers: [
        {
          provide: OrderDetailService,
          useValue: mockOrderDetailService,
        },
      ],
    }).compile();

    controller = module.get<OrderDetailController>(OrderDetailController);
    service = module.get<OrderDetailService>(OrderDetailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an order detail', async () => {
      const createOrderDetailDto: CreateOrderDetailDto = {
        orderId: '1',
        productId: '1',
        quantity: 2,
        price: 100,
      };
      mockOrderDetailService.create.mockResolvedValue({ orderDetail: createOrderDetailDto, message: 'Successfully created order' });
      const result = await controller.create(createOrderDetailDto);
      expect(result).toEqual({ orderDetail: createOrderDetailDto, message: 'Successfully created order' });
    });
  });

  describe('findAll', () => {
    it('should return a list of order details', async () => {
      const params = new GetOrderDetailDto();
      params.orderId = '1';
      params.productId = '1';
      params.quantity = 2;
      params.price = 100;
  
      const orderDetails = [{ orderId: '1', productId: '1', quantity: 2, price: 100 }];
      mockOrderDetailService.findAll.mockResolvedValue(orderDetails);
      const result = await controller.findAll(params);
      expect(result).toEqual(orderDetails);
    });
  });
  

  describe('findOneById', () => {
    it('should return an order detail by id', async () => {
      const id = '1';
      const orderDetail = { id, orderId: '1', productId: '1', quantity: 2, price: 100 };
      mockOrderDetailService.findOneById.mockResolvedValue(orderDetail);
      const result = await controller.findOneById(id);
      expect(result).toEqual(orderDetail);
    });
  });


  describe('remove', () => {
    it('should remove an order detail', async () => {
      const id = '1';
      mockOrderDetailService.remove.mockResolvedValue({ data: null, message: 'orderDetail deletion successful' });
      const result = await controller.remove(id);
      expect(result).toEqual({ data: null, message: 'orderDetail deletion successful' });
    });
  });
});