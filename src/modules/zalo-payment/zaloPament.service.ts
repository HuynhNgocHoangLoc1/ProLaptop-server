import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as moment from 'moment';
import * as CryptoJS from 'crypto-js';
import * as qs from 'qs';
import { JwtStrategy } from '../auth/utils/jwt.trategy';
import { OrderService } from '../order/order.service';

@Injectable()
export class ZaloPaymentService {
  constructor(private configService: ConfigService, private readonly orderService : OrderService) {}

  async createPayment(body: any, req: any) {
    const {carts, totalPrice} = body;

    const token = req.headers.authorization.split(' ')[1];

    const userId = await JwtStrategy.getUserIdFromToken(token);

    const deployedLink = this.configService.get<string>('DEPLOY_SERVICE_LINK');
    const config = {
      app_id: this.configService.get<string>('ZALOPAY_APP_ID'),
      key1: this.configService.get<string>('ZALOPAY_KEY1'),
      key2: this.configService.get<string>('ZALOPAY_KEY2'),
      endpoint: this.configService.get<string>('ZALOPAY_ENDPOINT_CREATE'),
  };

    const embed_data = {
      redirecturl: this.configService.get<string>('ZALOPAY_REDIRC_URL'),
    };

    const cartItems = carts;
  
    // Kiểm tra xem có mục giỏ hàng nào không
    if (cartItems.length === 0) {
      throw new NotFoundException('No items found in the cart with the selected product IDs');
    }

    const items = [
      {
        body : {...body},
        userId : userId
      },
    ];

    console.log(items)

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
      app_user: userId,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: totalPrice * 250,
      description: `Lazada - Payment for the order #${transID}`,
      bank_code: '',
      callback_url: `${deployedLink}/payment/zalo/callback`,
    };


    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order['mac'] = CryptoJS.HmacSHA256(data, config.key1).toString();

    try { 
      const response = await axios.post(config.endpoint, null, {
        params: order,
    });
      return { ...response.data, app_trans_id: order.app_trans_id };
    } catch (error: any) {
      throw new Error(`Payment creation failed: ${error.message}`);
    }
  }

  async handleZaloCallback(body: any) {
    const { data: dataStr, mac: reqMac } = body;

    console.log('callback');
    let result: any = {};

    try {
        // Tạo mac để kiểm tra tính hợp lệ
        const mac = CryptoJS.HmacSHA256(
            dataStr,
            this.configService.get<string>('ZALOPAY_KEY2')
        ).toString();
        console.log('Generated mac =', mac);

        // Kiểm tra tính hợp lệ của callback (từ ZaloPay server)
        if (reqMac !== mac) {
            // Callback không hợp lệ
            result.return_code = -1;
            result.return_message = 'mac not equal';
        } else {
            // Thanh toán thành công
            const dataJson = JSON.parse(dataStr);
            console.log(
                "Update order's status = success where app_trans_id =",
                dataJson['app_trans_id']
            );

            const items = JSON.parse(dataJson.item);

            const item = items[0];
            const { body, userId } = item[0];

            const newOrder = await this.orderService.createOrderFromCart(
                userId,
                body
            );

            console.log(newOrder);

            result.return_code = 1;
            result.return_message = 'success';
        }
    } catch (ex: any) {
        // Trường hợp lỗi, ZaloPay sẽ gọi lại (tối đa 3 lần)
        result.return_code = 0;
        result.return_message = ex.message;
    }

    return result;
}

async queryPayment(app_trans_id: string) {
    const postData = {
        app_id: this.configService.get<string>('ZALOPAY_APP_ID'),
        app_trans_id: app_trans_id,
        mac: '',
    };

    // Tạo dữ liệu cho HMAC
    const data = `${postData.app_id}|${postData.app_trans_id}|${this.configService.get<string>('ZALOPAY_KEY1')}`;

    // Tính toán MAC HMAC SHA256
    postData.mac = CryptoJS.HmacSHA256(
        data,
        this.configService.get<string>('ZALOPAY_KEY1')
    ).toString();

    try {
        const response = await axios.post(
            this.configService.get<string>('ZALOPAY_ENDPOINT_QUERY'),
            qs.stringify(postData),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.log(error.message);
        throw new HttpException(
            'Error querying payment',
            HttpStatus.BAD_REQUEST
        );
    }
}
}
