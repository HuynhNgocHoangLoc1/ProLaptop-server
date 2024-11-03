import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'passport-google-oauth20';
import { UserService } from '../user/userService';
import { User } from 'src/entities/user.entity';
import { EmailService } from '../email/email.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async signIn(userName: string, pass: string): Promise<any> {
    const user = await this.authRepository.findOne({ where: { userName } });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      userName: user.userName,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      id: user.id,
      userName: user.userName,
      email: user.email,
      gender: user.gender,
      address: user.address,
      phone: user.phoneNumber,
      avatar: user.avatar,
      role: user.role,
      isBlock: user.isBlock
    };
  }

  async validateUserFromGoogle(profile: Profile) {
    const { emails, displayName } = profile;
    const email = emails[0].value;
    let user = await this.authRepository.findOne({ where: { email: email } });

    if (!user) {
      user = this.authRepository.create({
        email,
        userName: displayName,
      });

      user = await this.authRepository.save(user);
    }

    return user;
  }

  async validateUserFromToken(token: string): Promise<User> {
    try {
      const decodedToken = this.jwtService.verify(token);

      if (!decodedToken || !decodedToken.id) {
        throw new UnauthorizedException('Invalid token');
      }
      const user = await this.authRepository.findOne({
        where: { id: decodedToken.id },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }
      throw error; 
    }
  }

  async requestPasswordReset(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const otp = crypto.randomInt(1000, 9999).toString();
    await this.userService.saveOtp(user.id, otp);
    await this.emailService.sendOtp(email, otp);

    return { message: 'OTP sent to your email' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || user.otp !== otp || user.otpExpires < new Date()) {
      throw new Error('Invalid or expired OTP');
    }
  
    await this.userService.clearOtp(user.id);
    return { message: 'OTP verified' };
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updatePassword(user.id, hashedPassword);
  
    return { message: 'Password successfully updated' };
  }
}
