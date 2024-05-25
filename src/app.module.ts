import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./modules/user/user.module";
import { DbModule } from './common/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CloudinaryService 
  ],
})
export class AppModule {}
