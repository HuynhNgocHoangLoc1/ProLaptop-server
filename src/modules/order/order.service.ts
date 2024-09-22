import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { GetOrderDto } from './dto/get-order.dto';
import { Orders } from 'src/entities/order.entity';
import {Order} from '../../common/enum/enum'
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { UserNotFoundException } from 'src/common/exception/not-found';
import { validate as uuidValidate } from 'uuid';
import { OrderDetail } from 'src/entities/order-detail.entity';
import { Review } from 'src/entities/review.entity';
import { PaymentDto } from './dto/payment.dto';
import * as crypto from 'crypto';
import * as https from 'https';



@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    private readonly entityManager: EntityManager,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) { }
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
      .select(['order'])
      .where('order.id = :id', { id })
      .getOne();
    return order;
  }


  async update(
    id: string, updateOrderDto: UpdateOrderDto,
  ) {
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
      order.paymentMethod =updateOrderDto.paymentMethod;
      order.statusDelivery = updateOrderDto.statusDelivery;
  
      await this.entityManager.save(order);
    } catch (error) {
      throw error;
    }
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

  // async paymentMomo(paymentDto: PaymentDto): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     const { amount, redirectUrl } = paymentDto;
  //     const partnerCode = 'MOMO';
  //     const accessKey = 'F8BBA842ECF85';
  //     const secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  //     const requestId = 'AKUBA' + new Date().getTime();
  //     const orderId = requestId;
  //     const orderInfo = 'Thanh toán MoMo';
  //     const ipnUrl = 'https://exactly-i7jp.onrender.com/checkout';
  //     const requestType = 'captureWallet';
  //     const extraData = '';
  //     const rawSignature =
  //       'accessKey=' +
  //       accessKey +
  //       '&amount=' +
  //       amount +
  //       '&extraData=' +
  //       extraData +
  //       '&ipnUrl=' +
  //       ipnUrl +
  //       '&orderId=' +
  //       orderId +
  //       '&orderInfo=' +
  //       orderInfo +
  //       '&partnerCode=' +
  //       partnerCode +
  //       '&redirectUrl=' +
  //       redirectUrl +
  //       '&requestId=' +
  //       requestId +
  //       '&requestType=' +
  //       requestType;

  //     const signature = crypto
  //       .createHmac('sha256', secretkey)
  //       .update(rawSignature)
  //       .digest('hex');

  //     const requestBody = JSON.stringify({
  //       partnerCode: partnerCode,
  //       accessKey: accessKey,
  //       requestId: requestId,
  //       amount: amount,
  //       orderId: orderId,
  //       orderInfo: orderInfo,
  //       redirectUrl: redirectUrl,
  //       ipnUrl: ipnUrl,
  //       extraData: extraData,
  //       requestType: requestType,
  //       signature: signature,
  //       lang: 'en',
  //     });

  //     const options = {
  //       hostname: 'test-payment.momo.vn',
  //       port: 443,
  //       path: '/v2/gateway/api/create',
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Content-Length': Buffer.byteLength(requestBody),
  //       },
  //     };

  //     const req = https.request(options, (res) => {
  //       let payUrl = '';
  //       res.setEncoding('utf8');
  //       res.on('data', (body) => {
  //         payUrl = JSON.parse(body).payUrl;
  //       });
  //       res.on('end', () => {
  //         resolve(payUrl);
  //       });
  //     });

  //     req.on('error', (e) => {
  //       reject(`problem with request: ${e.message}`);
  //     });

  //     // Write data to request body
  //     req.write(requestBody);
  //     req.end();
  //   });
  // }
  // async paymentMomo(paymentDto: PaymentDto): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     const { amount, redirectUrl } = paymentDto;
  //     const partnerCode = 'MOMO';
  //     const accessKey = 'F8BBA842ECF85';
  //     const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  //     const requestId = 'AKUBA' + new Date().getTime();
  //     const orderId = requestId;
  //     const orderInfo = 'Thanh toán MoMo';
  //     const ipnUrl = 'https://your-ipn-url.com';
  //     const requestType = 'captureWallet';
  //     const extraData = '';

  //     const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  //     const signature = crypto
  //       .createHmac('sha256', secretKey)
  //       .update(rawSignature)
  //       .digest('hex');

  //     const requestBody = JSON.stringify({
  //       partnerCode,
  //       accessKey,
  //       requestId,
  //       amount,
  //       orderId,
  //       orderInfo,
  //       redirectUrl,
  //       ipnUrl,
  //       extraData,
  //       requestType,
  //       signature,
  //       lang: 'en',
  //     });

  //     const options = {
  //       hostname: 'test-payment.momo.vn',
  //       port: 443,
  //       path: '/v2/gateway/api/create',
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Content-Length': Buffer.byteLength(requestBody),
  //       },
  //     };

  //     const req = https.request(options, (res) => {
  //       let data = '';
  //       res.on('data', (chunk) => {
  //         data += chunk;
  //       });
  //       res.on('end', () => {
  //         const payUrl = JSON.parse(data).payUrl;
  //         resolve(payUrl);
  //       });
  //     });

  //     req.on('error', (e) => {
  //       reject(`problem with request: ${e.message}`);
  //     });

  //     req.write(requestBody);
  //     req.end();
  //   });
  // }

  async paymentMomo(paymentDto: PaymentDto): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const { amount, redirectUrl } = paymentDto;
      const partnerCode = 'MOMO';
      const accessKey = 'F8BBA842ECF85';
      const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
      const requestId = 'AKUBA' + new Date().getTime();
      const orderId = requestId;
      const orderInfo = 'Thanh toán MoMo';
      const ipnUrl = 'https://your-ipn-url.com';
      const requestType = 'captureWallet';
      const extraData = '';

      // Logging input data
      // console.log('Sending request to MoMo with data:', { amount, redirectUrl });

      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

      const signature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

      const requestBody = JSON.stringify({
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: 'en',
      });

      // Logging request body
      // console.log('Request body to MoMo:', requestBody);

      const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody),
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          // Logging response data
          // console.log('Response from MoMo:', data);
          try {
            const response = JSON.parse(data);
            if (response && response.payUrl) {
              resolve(response.payUrl);
            } else {
              reject('Invalid response from MoMo');
            }
          } catch (error) {
            reject('Failed to parse response from MoMo');
          }
        });
      });

      req.on('error', (e) => {
        console.error('Request error:', e.message);
        reject(`problem with request: ${e.message}`);
      });

      req.write(requestBody);
      req.end();
    });
  }
}
