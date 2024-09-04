import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';

export async function seedProducts(productsRepository: Repository<Product>, categoryRepository: Repository<Category>) {
  const categories = await categoryRepository.find();
  const macBookCategory = categories.find(category => category.name === 'MacBook');
  const asusCategory = categories.find(category => category.name === 'Asus');

  const p1 = productsRepository.create({
    name: 'Macbook',
    description: 'The MacBook Pro M1 2019 is a powerful and sleek laptop.',
    price: 5000,
    stockQuantity: 10,
    imageUrl: 'https://macone.vn/wp-content/uploads/2021/10/macbook-pro-spacegray-m1-2020.jpeg',
    ram: '8GB',
    cpu: 'Apple M1',
    card: 'Apple M1',
    chip: 'Apple M1',
    hardDrive: '256GB',
    categoryId: macBookCategory.id,
  });

  const p2 = productsRepository.create({
    name: 'Msi',
    description: 'The ASUS ZenBook 14 is a compact and versatile laptop.',
    price: 1200,
    stockQuantity: 15,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.T1oI2LwA1oB0dweSyhLbVAHaEt&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
    categoryId: asusCategory.id,
  });

  const p3 = productsRepository.create({
    name: 'Asus',
    description: 'The ASUS ZenBook 14 is a compact and versatile laptop.',
    price: 1200,
    stockQuantity: 15,
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.oxoxd5ungCm42DcxjbA1MgHaE7&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
    categoryId: asusCategory.id,
  });

  await productsRepository.save([p1, p2, p3]);
}
