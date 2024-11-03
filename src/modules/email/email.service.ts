// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,  // Thử cổng 587 với TLS
        secure: false, // Bật secure thành false để dùng TLS
        auth: {
          user: 'huynhngochoangloc0211102@gmail.com',
          pass: 'doef sqsn dnwb upbq',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      
  async sendOtp(email: string, otp: string) {
    const mailOptions = {
      from: 'huynhngochoangloc0211102@gmail.com', // Use the same email as your authenticated one
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP code is ${otp}`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
