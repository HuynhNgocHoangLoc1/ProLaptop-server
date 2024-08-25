import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';

export async function seedProducts(productsRepository: Repository<Product>) {
  const p1 = productsRepository.create({
    name: 'Macbook',
    description: 'The MacBook Pro M1 2019 is a powerful and sleek laptop.',
    price: 5000,
    stockQuantity: 10,
    imageUrl: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',
    ram: '8GB',
    cpu: 'Apple M1',
    card: 'Apple M1',
    chip: 'Apple M1',
    hardDrive: '256GB',
  });
  const p2 = productsRepository.create({
    name: 'ASUS ZenBook',
    description: 'The ASUS ZenBook 14 is a compact and versatile laptop.',
    price: 1200,
    stockQuantity: 15,
    imageUrl: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
  });
  // Add more products as needed...
  
  await productsRepository.save([p1, p2]);
}
