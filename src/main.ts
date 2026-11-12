import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './modules/chatbox/socket.config';
import * as session from 'express-session';
import * as passport from 'passport';
import { getCorsOrigin, getPort, requireEnv } from './common/config/app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  // Cấu hình WebSocket Adapter
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  // Cấu hình CORS
  app.enableCors({
    origin: getCorsOrigin(), // Lấy từ CLIENT_URL; chưa khai báo thì cho phép mọi nguồn
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Cấu hình Session và Passport
  app.use(
    session({
      secret: requireEnv('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session()); 

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Cấu hình ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(getPort());
}
bootstrap();
