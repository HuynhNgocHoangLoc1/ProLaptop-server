import { Controller, Post } from '@nestjs/common';
import { SeedingService } from './seeding.service';

@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Post()
  seed() {
    return this.seedingService.seed();
  }

  /** POST /api/seeding/demo — seed bộ dữ liệu demo đầy đủ (XOÁ toàn bộ dữ liệu hiện có) */
  @Post('demo')
  seedDemo() {
    return this.seedingService.seedDemo();
  }
}
