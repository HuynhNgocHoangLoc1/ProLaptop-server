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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    UserModule,
    OrderModule,
    OrderDetailModule,
    ReviewModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CloudinaryService 
  ],
})
export class AppModule {}
