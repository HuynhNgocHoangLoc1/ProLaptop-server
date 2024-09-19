// auth.service.ts
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { UserService } from '../user/userService';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
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
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
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
}
