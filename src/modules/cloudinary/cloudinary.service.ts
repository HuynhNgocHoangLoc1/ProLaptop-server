import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import bufferToStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dh6dvndzn',
      api_key: '554725321992422',
      api_secret: 'LC_90B4BV2kW4R0lPK2_6KJd56Y',
    });
  }

  async uploadImageFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> { // Thay đổi từ Multer.File sang Express.Multer.File
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      bufferToStream(file.buffer).pipe(upload);
    });
  }

  async deleteFile(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  extractPublicIdFromUrl(fileUrl: string): string {
    const parts = fileUrl.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.split('.').slice(0, -1).join('.');
  }
}
