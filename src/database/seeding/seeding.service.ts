import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { seedCategories } from '../seeds/seed-categories';
import { seedProducts } from '../seeds/seed-products';
import { seedUsers } from '../seeds/seed-users';

@Injectable()
export class SeedingService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Truy xuất các repository
      const usersRepository = queryRunner.manager.getRepository(User);
      const categorysRepository = queryRunner.manager.getRepository(Category);
      const productsRepository = queryRunner.manager.getRepository(Product);

      // Xóa dữ liệu hiện có
      await usersRepository.clear();
      await categorysRepository.clear();
      await productsRepository.clear();

      // Seed dữ liệu
      await seedCategories(categorysRepository);
      await seedProducts(productsRepository);
      await seedUsers(usersRepository);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
