// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserController } from '../user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserService } from '../user/userService';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './googleStrategy';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, CloudinaryService, GoogleStrategy, EmailService], 
})
export class AuthModule {}
