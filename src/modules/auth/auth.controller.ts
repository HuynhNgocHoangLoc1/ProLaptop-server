// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './utils/google.guard';

interface AuthenticatedUser {
  accessToken: string;
  redirectURL: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.userName, signInDto.password);
  }
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {
    return { msg: 'Google Authentication' };
  }
  
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleRedirect(@Req() req: Request & { user: AuthenticatedUser }, @Res() res: Response) {
    try {
      const user = req.user;
      const { accessToken, redirectURL } = user;
  
      if (!redirectURL) {
        throw new Error("Redirect URL is undefined");
      }
  
      res.redirect(redirectURL);
    } catch (error) {
      console.error('Error during Google redirect:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message }); // Trả về thông báo lỗi cụ thể
    }
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    return this.authService.verifyOtp(email, otp);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(email, newPassword);
  }
}
