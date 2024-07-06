import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID: '548809623096-881v6ur935qk6m805vbhadonftrv2tsq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    try {
      console.log('Inside validate function');
      console.log(profile); // Log the entire profile object to see its structure

      const user = await this.authService.validateUserFromGoogle(profile);

      const payload = { 
        sub: user.id, 
        email: user.email, 
        displayName: user.userName,
        role: user.role
      };

      const token = this.jwtService.sign(payload);
      const redirectURL = `http://localhost:5000?token=${token}`;
      console.log(payload);
      return { accessToken: token, redirectURL };
    } catch (error) {
      console.error('Error in validate function', error); // Log any errors
      throw error;
    }
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
