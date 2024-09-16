import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


// kết nối deploy data ở render
// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true, // Sử dụng ConfigModule trên toàn bộ ứng dụng
//     }),
//     TypeOrmModule.forRootAsync({
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get('DB_HOST'),
//         port: configService.get<number>('DB_PORT'),
//         database: configService.get('DB_NAME'),
//         username: configService.get('DB_USER'),
//         password: configService.get('DB_PASSWORD'),
//         url: configService.get('DB_URL'),
//         entities: [__dirname + './../../entities/*{.ts,.js}'],
//         synchronize: true,
//         ssl: {
//           require: true,
//           rejectUnauthorized: false,
//         },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })


// Kết nối database ở local
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        entities: [__dirname + './../../entities/*{.ts,.js}'],
        synchronize: true,
        // ssl: {
        //   require: true,
        //   rejectUnauthorized: false,
        // },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
