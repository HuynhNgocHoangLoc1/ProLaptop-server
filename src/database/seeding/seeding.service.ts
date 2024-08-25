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
       const users = await usersRepository.find();
       await usersRepository.remove(users);
       const categorys = await categorysRepository.find();
       await categorysRepository.remove(categorys);
      //  const orders = await ordersRepository.find();
      //  await ordersRepository.remove(orders);
       const products = await productsRepository.find();
       await productsRepository.remove(products);
      //  const reviews = await reviewsRepository.find();
      //  await reviewsRepository.remove(reviews);
      //  const orderDetails = await orderDetailRepository.find();
      //  await orderDetailRepository.remove(orderDetails);
      //  const shippingAddresses = await shippingAddressRepository.find();
      //  await shippingAddressRepository.remove(shippingAddresses); 

      // Seed dữ liệu
      await seedCategories(categorysRepository);
      await seedProducts(productsRepository, categorysRepository);
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
