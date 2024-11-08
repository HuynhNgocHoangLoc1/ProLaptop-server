import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './modules/chatbox/socket.config';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  // Cấu hình WebSocket Adapter
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  // Cấu hình CORS
  app.enableCors({
    origin: '*', // Đặt '*' để cho phép tất cả các nguồn hoặc chỉ định các nguồn cụ thể
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Cấu hình Session và Passport
  app.use(
    session({
      secret: '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',
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

  await app.listen(5003);
}
bootstrap();
