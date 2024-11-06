import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./modules/user/user.module";
import { DbModule } from './common/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';
import { OrderModule } from './modules/order/order.module';
import { OrderDetailModule } from './modules/order-detail/order-detail.module';
import { ReviewModule } from './modules/review/review.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedingModule } from './database/seeding/seeding.module';
import { CartModule } from './modules/cart/cart.module';
import { PaymentModule } from './modules/zalo-payment/payment.module';
import { EmailService } from './modules/email/email.service';
import { MessageModule } from './modules/chatbox/chatbox.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    UserModule,
    OrderModule,
    OrderDetailModule,
    ReviewModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    SeedingModule,
    CartModule,
    PaymentModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CloudinaryService,
    EmailService 
  ],
})
export class AppModule {}
