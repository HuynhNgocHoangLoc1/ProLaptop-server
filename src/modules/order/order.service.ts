import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { GetOrderDto } from './dto/get-order.dto';
import { Orders } from 'src/entities/order.entity';
import { Order, PaymentMethod, StatusDelivery } from '../../common/enum/enum';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { UserNotFoundException } from 'src/common/exception/not-found';
import { validate as uuidValidate } from 'uuid';
import { OrderDetail } from 'src/entities/order-detail.entity';
import { Review } from 'src/entities/review.entity';
import { PaymentDto } from './dto/payment.dto';
import * as crypto from 'crypto';
import * as https from 'https';
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from '../auth/utils/jwt.trategy';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = new Orders(createOrderDto);
    await this.entityManager.save(order);
    return { order, message: 'Successfully created order' };
  }

  async findAll(params: GetOrderDto) {
    const order = this.ordersRepository
      .createQueryBuilder('order')
      .select(['order'])
      .skip(params.skip)
      .take(params.take)
      .orderBy('order.createdAt', Order.DESC);
    if (params.search) {
      order.andWhere('order.order ILIKE :order', {
        order: `%${params.search}%`,
      });
    }
    const [result, total] = await order.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(result, pageMetaDto, 'Success');
  }

  async findOneById(id: string) {
    const order = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetail', 'orderDetail')
      .where('order.id = :id', { id })
      .getOne();
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    try {
      const order = await this.ordersRepository.findOneBy({ id });
      if (!order) {
        throw new UserNotFoundException();
      }
      order.userId = updateOrderDto.userId;
      order.date = updateOrderDto.date;
      order.name = updateOrderDto.name;
      order.email = updateOrderDto.email;
      order.phoneNumber = updateOrderDto.phoneNumber;
      order.shippingAddress = updateOrderDto.shippingAddress;
      order.price = updateOrderDto.price;
      order.paymentMethod = updateOrderDto.paymentMethod;
      order.statusDelivery = updateOrderDto.statusDelivery;

      await this.entityManager.save(order);
    } catch (error) {
      throw error;
    }
    return { data: null, message: 'Successfully update order' };
  }

  async remove(id: string) {
    const order = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetail', 'orderDetail')
      .where('order.id = :id', { id })
      .getOne();
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const review = await this.reviewsRepository
      .createQueryBuilder('review')
      .where('review.orderId = :id', { id })
      .getOne();

    if (review) {
      await this.reviewsRepository.softDelete(review.id);
    }

    if (order.orderDetail && order.orderDetail.length > 0) {
      for (const orderDetail of order.orderDetail) {
        await this.entityManager.softDelete(OrderDetail, {
          id: orderDetail.id,
        });
      }
    }
    await this.ordersRepository.softDelete(id);
    return { data: null, message: 'Order deletion successful' };
  }

  async paymentVnPay(paymentDto: PaymentDto): Promise<string> {
    const { amount, redirectUrl } = paymentDto;

    // Các thông tin từ VNPay
    const vnp_TmnCode = 'VNPAYTEST';
    const vnp_HashSecret = 'your_secret_key'; // Thay bằng hash secret thực tế của bạn
    const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const vnp_ReturnUrl = 'https://your-return-url.com'; // Thay bằng URL thực tế
    const vnp_OrderInfo = 'Thanh toán đơn hàng VNPAY';
    const vnp_OrderType = 'billpayment';
    const vnp_Locale = 'vn'; // Ngôn ngữ (vn/en)
    const vnp_CurrCode = 'VND';

    // Đây có thể lấy IP của user từ request, thay thế hard-code
    const vnp_IpAddr = '127.0.0.1'; // Địa chỉ IP của người dùng (có thể lấy từ request)

    // Tạo request ID và mã đơn hàng duy nhất
    const vnp_TxnRef = new Date().getTime().toString();

    // Tạo các tham số cho yêu cầu
    const vnp_Params: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: vnp_TmnCode,
      vnp_Amount: amount * 100, // VNPay yêu cầu amount theo đơn vị VND * 100
      vnp_CreateDate: new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/-|T|:/g, ''),
      vnp_CurrCode: vnp_CurrCode,
      vnp_IpAddr: vnp_IpAddr,
      vnp_Locale: vnp_Locale,
      vnp_OrderInfo: vnp_OrderInfo,
      vnp_OrderType: vnp_OrderType,
      vnp_ReturnUrl: redirectUrl || vnp_ReturnUrl, // Ưu tiên sử dụng redirectUrl từ request nếu có
      vnp_TxnRef: vnp_TxnRef,
    };

    // Tạo chữ ký (signature) từ các tham số đã được sắp xếp theo thứ tự key
    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vnp_Params[key];
        return acc;
      }, {});

    // Sử dụng URLSearchParams thay cho qs.stringify
    const urlSearchParams = new URLSearchParams(sortedParams);

    // Tạo chữ ký bảo mật
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', vnp_HashSecret);
    const signed = hmac
      .update(Buffer.from(urlSearchParams.toString(), 'utf-8'))
      .digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    // Tạo lại URL với URLSearchParams
    urlSearchParams.append('vnp_SecureHash', vnp_Params['vnp_SecureHash']);

    // Tạo URL thanh toán VNPay
    const vnpUrl = `${vnp_Url}?${urlSearchParams.toString()}`;
    return vnpUrl;
  }

  async createOrderFromCart(userId: any, body: any) {
    // console.log(userId)
  
    // Lấy các mục giỏ hàng của user mà productId nằm trong danh sách selectedProductIds
    const cartItems = body.carts;
  
    // Kiểm tra xem có mục giỏ hàng nào không
    if (cartItems.length === 0) {
      throw new NotFoundException(
        'No items found in the cart with the selected product IDs',
      );
    }
  
    // Tạo order mới với thông tin userId, date, name và email
    const newOrder = this.ordersRepository.create({
      userId: userId,
      date: new Date(),
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      shippingAddress: body.shippingAddress,
      paymentMethod: body.paymentMethod,
      statusDelivery: StatusDelivery.PENDING,
      price: body.totalPrice,
    });
  
    const savedOrder = await this.ordersRepository.save(newOrder);
  
    // Lưu orderId và productId vào từng OrderDetail, sử dụng Promise.all để chạy song song
    const orderDetailsPromises = cartItems.map(async (cartItem: any) => {
      const orderDetail = this.orderDetailRepository.create({
        orderId: savedOrder.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: cartItem.price,
      });
  
      // Lưu OrderDetail vào database
      await this.orderDetailRepository.save(orderDetail);
  
      // Trừ stockQuantity của product
      const product = await this.productRepository.findOne({
        where: { id: cartItem.productId },});
      if (product) {
        product.stockQuantity -= cartItem.quantity;
        await this.productRepository.save(product);
      }
    });
  
    await Promise.all(orderDetailsPromises);
  
    // Xóa các mục CartItem đã tạo order khỏi giỏ hàng
    cartItems.map(async (cartItem: any) => {
      // console.log("CartItem ID:", cartItem.id); // Kiểm tra ID
      if (cartItem.id) {
        await this.cartRepository.delete(cartItem.id);
      } else {
        console.log('Cart item has no ID:', cartItem);
      }
    });
  
    return { message: 'Order created successfully', order: savedOrder };
  }
  

  async getListOrderByUser(request: any) {
    const token = request.headers.authorization.split(' ')[1];
    // console.log(token)
    const userId = await JwtStrategy.getUserIdFromToken(token);
    // console.log(userId)
    if (!userId) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Lấy giá trị `status` từ query parameters
    const { status } = request.query;

    // Khai báo điều kiện lọc là kiểu `any` để linh hoạt
    let filterCondition: any = { userId: userId };

    // Nếu `status` không phải là 'product', thêm điều kiện lọc theo `statusDelivery`
    if (status) {
      filterCondition.statusDelivery = status;
    }

    // Trả về danh sách đơn hàng dựa trên điều kiện lọc
    return await this.ordersRepository.find({
      where: filterCondition,
      relations: ['orderDetail', 'orderDetail.product', 'orderDetail.review'], // Bao gồm thông tin chi tiết đơn hàng
    });
  }

  async findAllOrder(): Promise<Orders[]> {
    return await this.ordersRepository.find(); // Lấy tất cả đơn hàng
  }

  async totalRevenue() {
    const successfulOrders = await this.ordersRepository.find({
      where: { statusDelivery: StatusDelivery.SUCCESS },
    });

    // Tính tổng tiền
    const totalAmount = successfulOrders.reduce(
      (acc, order) => acc + order.price,
      0,
    );

    return { totalAmount, message: 'Total amount for successful orders' };
  }
  async calculateDailySuccessOrdersWeekly() {
    const startOfWeek = this.getStartOfWeek();
    const endOfWeek = this.getEndOfWeek();

    const dailyRevenue = await this.ordersRepository
      .createQueryBuilder('order')
      .select('DATE(order.createdAt) AS date, SUM(order.price) AS total')
      .where('order.statusDelivery = :status', { status: 'Success' })
      .andWhere('order.createdAt BETWEEN :start AND :end', {
        start: startOfWeek,
        end: endOfWeek,
      })
      .groupBy('DATE(order.createdAt)')
      .orderBy('DATE(order.createdAt)', 'ASC')
      .getRawMany();

    console.log('Daily Revenue:', dailyRevenue); // Ghi log doanh thu hàng ngày

    const result = [];
    for (
      let date = startOfWeek;
      date <= endOfWeek;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = date.toISOString().slice(0, 10); // Định dạng thành YYYY-MM-DD
      const revenueEntry = dailyRevenue.find(
        (entry) => {
            // Kiểm tra kiểu dữ liệu của entry.date
            if (typeof entry.date === 'string') {
                return entry.date.slice(0, 10) === formattedDate;
            } else if (entry.date instanceof Date) {
                return entry.date.toISOString().slice(0, 10) === formattedDate;
            }
            return false; // Nếu không phải chuỗi hoặc Date, trả về false
        }
      );
      console.log(`Checking date: ${formattedDate}, Revenue Entry:`, revenueEntry); // Ghi log từng ngày và doanh thu tương ứng
      result.push({
        date: formattedDate,
        revenue: revenueEntry ? Number(revenueEntry.total) : 0,
      });
    }

    return result;
}

  private getStartOfWeek() {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay() + 1; // Thứ Hai
    return new Date(today.setDate(firstDayOfWeek));
  }

  private getEndOfWeek() {
    const today = new Date();
    const lastDayOfWeek = today.getDate() - today.getDay() + 7; // Chủ Nhật
    return new Date(today.setDate(lastDayOfWeek));
  }
}
