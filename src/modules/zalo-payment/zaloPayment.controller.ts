import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ZaloPaymentService } from './zaloPament.service';
import { RoleEnum } from '../../common/enum/enum';
import { RolesGuard } from '../auth/utils/role.middleware';
import { AuthGuard } from '../auth/utils/auth.guard';

@Controller('payment/zalo')
export class ZaloPaymentController {
  constructor(private zaloPaymentService: ZaloPaymentService) {}

  @Post('/payment')
  @UseGuards(AuthGuard, new RolesGuard([RoleEnum.USER, RoleEnum.ADMIN]))
  async createPayment(@Body() body: any, @Req() req: any) {
    return this.zaloPaymentService.createPayment(body, req);
  }

  @Post('/callback')
    async callbackPayment(@Body() body: any) {
        return await this.zaloPaymentService.handleZaloCallback(body);
    }

    @Get('/order-status/:app_trans_id')
    @UseGuards(AuthGuard, new RolesGuard([RoleEnum.USER, RoleEnum.ADMIN]))
    async checkOrderStatus(@Param('app_trans_id') app_trans_id: string) {
        return await this.zaloPaymentService.queryPayment(app_trans_id);
    }
}
