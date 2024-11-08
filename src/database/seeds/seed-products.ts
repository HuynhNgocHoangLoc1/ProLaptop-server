import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';

export async function seedProducts(
  productsRepository: Repository<Product>,
  categoryRepository: Repository<Category>,
) {
  const categories = await categoryRepository.find();
  
  const macBookCategory = categories.find(
    (category) => category.name === 'MacBook',
  );
  const asusCategory = categories.find((category) => category.name === 'Asus');
  const hpCategory = categories.find((category) => category.name === 'Hp');
  const msiCategory = categories.find((category) => category.name === 'Msi');
  const p1 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 1',
    description: 'The MacBook Pro M1 2019 is powered by Apple\'s M1 chip. It has a 13-inch Retina display with True Tone, offering stunning colors and detail.',
    price: 5000,
    stockQuantity: 10,
    imageUrl: 'https://macone.vn/wp-content/uploads/2021/10/macbook-pro-spacegray-m1-2020.jpeg',
    ram: '8GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '256GB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p2 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 2',
    description: 'The MacBook Pro M1 offers the best of both worlds: powerful performance and excellent battery life. Its design is sleek and portable.',
    price: 5100,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.U3HtSCQoEDdX828RICODrQHaEK&pid=Api&P=0&h=180',
    ram: '8GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '512GB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p3 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 3',
    description: 'Apple\'s MacBook Pro M1 2019 comes with a powerful M1 chip and a high-definition display. It features amazing battery life and exceptional performance.',
    price: 5200,
    stockQuantity: 10,
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.IrWKuY8JdsFoZ4sZtHUrAgHaD1&pid=Api&P=0&h=180',
    ram: '8GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '1TB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p4 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 4',
    description: 'The MacBook Pro M1 2019 features a sleek design and advanced capabilities with an 8-core CPU and 8-core GPU.',
    price: 5300,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.EGdWv0GhhD_luVjVelQVtwHaEK&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '512GB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p5 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 5',
    description: 'The MacBook Pro M1 is a powerful laptop with an 8-core CPU and a Retina display. It is perfect for power users and creative professionals.',
    price: 5400,
    stockQuantity: 10,
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.gu12Qc0V-k4m-AZDfs0nAwHaFs&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '1TB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p6 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 6',
    description: 'The MacBook Pro M1 is designed for professionals who need high performance and a sleek, portable design.',
    price: 5500,
    stockQuantity: 10,
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.l5G5Pjyl5GwwRfLg0RXDZwHaE7&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '2TB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p7 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 7',
    description: 'This MacBook Pro is ideal for both personal and professional use, with a long battery life and powerful specs.',
    price: 5600,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.TZU90gTrHVtRMjRNJ2OgJgHaEK&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '2TB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p8 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 8',
    description: 'The MacBook Pro M1 is known for its blazing-fast performance and incredible battery life.',
    price: 5700,
    stockQuantity: 10,
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.12lMABA22k6buWJ5_Qk_SAHaEK&pid=Api&P=0&h=180',
    ram: '32GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '512GB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p9 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 9',
    description: 'A great option for users who require performance and portability. The MacBook Pro M1 2019 is a versatile, all-purpose laptop.',
    price: 5800,
    stockQuantity: 10,
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.RozW5d2P1LDF6zYJLwdW0gHaFj&pid=Api&P=0&h=180',
    ram: '32GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '1TB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p10 = productsRepository.create({
    name: 'MacBook Pro M1 2019 - 10',
    description: 'The MacBook Pro M1 is the best choice for creative professionals looking for exceptional performance in a thin, light laptop.',
    price: 5900,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.X_BxKKJREvfJ2midxncHbgHaHa&pid=Api&P=0&h=180',
    ram: '32GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '2TB SSD',
    categoryId: macBookCategory.id,
  });

  const p11 = productsRepository.create({
    name: 'Asus ZenBook 14 - 1',
    description: 'Asus ZenBook 14 is a sleek laptop that comes with Intel Core i7, 16GB RAM, and NVIDIA GeForce MX250. Ideal for professionals and gamers.',
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
  
  const p12 = productsRepository.create({
    name: 'Asus ZenBook 14 - 2',
    description: 'A versatile laptop from Asus featuring an Intel Core i7 processor, 16GB RAM, and a slim, lightweight design. Perfect for students and business professionals.',
    price: 1250,
    stockQuantity: 15,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.vewfenftbHKrLMt4yaq72wHaHa&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
    categoryId: asusCategory.id,
  });
  
  const p13 = productsRepository.create({
    name: 'Asus ZenBook 14 - 3',
    description: 'Lightweight and powerful, the Asus ZenBook 14 is ideal for multitasking and heavy applications.',
    price: 1300,
    stockQuantity: 15,
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.cHBliSRfqC8P73O-j5_rQgHaE4&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '1TB SSD',
    categoryId: asusCategory.id,
  });
  
  const p14 = productsRepository.create({
    name: 'Asus ZenBook 14 - 4',
    description: 'Asus ZenBook 14 features a stunning display, fast performance, and long battery life. Ideal for professionals on the go.',
    price: 1350,
    stockQuantity: 15,
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.TSID-7jtQvh0nKgqqJFeaQHaHL&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '1TB SSD',
    categoryId: asusCategory.id,
  });
  
  const p15 = productsRepository.create({
    name: 'Asus ZenBook 14 - 5',
    description: 'An efficient laptop with powerful performance, featuring the Intel Core i7 processor and 16GB RAM. A great choice for business professionals.',
    price: 1400,
    stockQuantity: 15,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.z-ZT0RMPWi2YJAbUKyP2NwHaHa&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '1TB SSD',
    categoryId: asusCategory.id,
  });
  
  const p16 = productsRepository.create({
    name: 'Asus ZenBook 14 - 6',
    description: 'A slim and stylish laptop featuring a Core i7 processor and GeForce MX250 GPU. It’s a perfect machine for creators and professionals.',
    price: 1450,
    stockQuantity: 15,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.WFErKkuWBk7qsHUe2wZxfgHaE0&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '2TB SSD',
    categoryId: asusCategory.id,
  });
  
  const p17 = productsRepository.create({
    name: 'Asus ZenBook 14 - 7',
    description: 'The ZenBook 14 combines performance and portability with an Intel Core i7 processor and NVIDIA GeForce MX250 GPU.',
    price: 1500,
    stockQuantity: 15,
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.s9kXjrptGFlhMZqfKZqFhwHaHa&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '2TB SSD',
    categoryId: asusCategory.id,
  });
  
  const p18 = productsRepository.create({
    name: 'Asus ZenBook 14 - 8',
    description: 'A high-performance laptop with Intel Core i7, 16GB RAM, and long battery life.',
    price: 1550,
    stockQuantity: 15,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.FRvn4RT6RVM57E_RnyaChQHaFj&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '2TB SSD',
    categoryId: asusCategory.id,
  });
  
  const p19 = productsRepository.create({
    name: 'Asus ZenBook 14 - 9',
    description: 'Asus ZenBook 14 offers an excellent balance of performance and style. Perfect for professionals.',
    price: 1600,
    stockQuantity: 15,
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.zd1qKn5D8kAW42LGEMMy5QHaFh&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '2TB SSD',
    categoryId: asusCategory.id,
  });
  
  const p20 = productsRepository.create({
    name: 'Asus ZenBook 14 - 10',
    description: 'A stylish and powerful laptop with Intel Core i7 and 16GB of RAM, designed for productivity.',
    price: 1650,
    stockQuantity: 15,
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.4nRPowJGE7FFCVi6WeAydAHaD4&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GeForce MX250',
    chip: 'Intel Core i7',
    hardDrive: '2TB SSD',
    categoryId: asusCategory.id,
  });

  const p21 = productsRepository.create({
    name: 'MSI GE76 Raider - 1',
    description: 'Powerful gaming laptop with Intel Core i9 and NVIDIA RTX 3080.',
    price: 2500,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.Y5GTOLzlUcUlJrhLfqI13gHaHa&pid=Api&P=0&h=180',
    ram: '32GB',
    cpu: 'Intel Core i9',
    card: 'NVIDIA RTX 3080',
    chip: 'Intel Core i9',
    hardDrive: '1TB SSD',
    categoryId: msiCategory.id,
  });
  
  const p22 = productsRepository.create({
    name: 'MSI GE76 Raider - 2',
    description: 'Top-tier gaming laptop featuring Intel Core i9 and fast SSD.',
    price: 2600,
    stockQuantity: 10,
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.4IWtb2QDxa6atL3xXvFzGgHaE7&pid=Api&P=0&h=180',
    ram: '32GB',
    cpu: 'Intel Core i9',
    card: 'NVIDIA RTX 3080',
    chip: 'Intel Core i9',
    hardDrive: '2TB SSD',
    categoryId: msiCategory.id,
  });
  
  const p23 = productsRepository.create({
    name: 'MSI GS66 Stealth - 3',
    description: 'Slim and portable with Intel Core i7 and NVIDIA RTX 3070.',
    price: 2100,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.RPJWLY48iO1l11_1mS_HpwHaFj&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA RTX 3070',
    chip: 'Intel Core i7',
    hardDrive: '1TB SSD',
    categoryId: msiCategory.id,
  });
  
  const p24 = productsRepository.create({
    name: 'MSI Stealth 15M - 4',
    description: 'Compact and lightweight laptop with Intel Core i7 and GTX 1660 Ti.',
    price: 1800,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.O08LCJMBR2XyShED_X_psQHaFC&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GTX 1660 Ti',
    chip: 'Intel Core i7',
    hardDrive: '1TB SSD',
    categoryId: msiCategory.id,
  });
  
  const p25 = productsRepository.create({
    name: 'MSI GF65 Thin - 5',
    description: 'Affordable yet powerful with Intel Core i7 and GTX 1650.',
    price: 1500,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.BniDVCatEjv69t-c6G-bmAHaEK&pid=Api&P=0&h=180',
    ram: '8GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GTX 1650',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
    categoryId: msiCategory.id,
  });
  
  const p26 = productsRepository.create({
    name: 'MSI GL65 Leopard - 6',
    description: 'Gaming laptop with Intel Core i7 and powerful graphics.',
    price: 1900,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.yPASxmHILOn3QZ-BpQ_W_AHaE8&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GTX 1660 Ti',
    chip: 'Intel Core i7',
    hardDrive: '1TB SSD',
    categoryId: msiCategory.id,
  });
  
  const p27 = productsRepository.create({
    name: 'MSI Creator 17 - 7',
    description: 'Perfect for content creators with Intel Core i9 and RTX 2080.',
    price: 2800,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.1Pq5hQCK1uF_xbMEefV5wgHaFh&pid=Api&P=0&h=180',
    ram: '32GB',
    cpu: 'Intel Core i9',
    card: 'NVIDIA RTX 2080',
    chip: 'Intel Core i9',
    hardDrive: '2TB SSD',
    categoryId: msiCategory.id,
  });
  
  const p28 = productsRepository.create({
    name: 'MSI GT76 Titan - 8',
    description: 'Ultimate performance with Intel Core i9 and RTX 3090.',
    price: 3500,
    stockQuantity: 10,
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.a3G1CzQEdd8HHmhPC1rsPgHaGE&pid=Api&P=0&h=180',
    ram: '64GB',
    cpu: 'Intel Core i9',
    card: 'NVIDIA RTX 3090',
    chip: 'Intel Core i9',
    hardDrive: '2TB SSD',
    categoryId: msiCategory.id,
  });
  
  const p29 = productsRepository.create({
    name: 'MSI Alpha 15 - 9',
    description: 'Affordable gaming laptop with AMD Ryzen 7 and Radeon RX 5600M.',
    price: 1700,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.9JwdyYEYxUzQ8-PXudvg1gHaFj&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'AMD Ryzen 7',
    card: 'Radeon RX 5600M',
    chip: 'AMD Ryzen 7',
    hardDrive: '1TB SSD',
    categoryId: msiCategory.id,
  });
    
  const p30 = productsRepository.create({
    name: 'MSI GL75 Leopard - 10',
    description: 'Great gaming performance with Intel Core i7 and GTX 1660 Ti.',
    price: 2000,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.Gh4a-GK59O3T2wSija9YLwHaF7&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA GTX 1660 Ti',
    chip: 'Intel Core i7',
    hardDrive: '1TB SSD',
    categoryId: msiCategory.id,
  });
  
  const p31 = productsRepository.create({
    name: 'HP Spectre x360 - 1',
    description: 'Premium 2-in-1 laptop with Intel Core i7 and long battery life.',
    price: 1800,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.88ixC6iwX0GMGYzABXVZzQHaFI&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'Intel Iris Xe',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
    categoryId: hpCategory.id,
  });
  
  const p32 = productsRepository.create({
    name: 'HP Envy 13 - 2',
    description: 'Slim laptop with Intel Core i7 and 4K display.',
    price: 1900,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.6Qi8e9z7kH5Plxzk2uQxYAHaGL&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'Intel Iris Xe',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
    categoryId: hpCategory.id,
  });
  
  const p33 = productsRepository.create({
    name: 'HP Pavilion 15 - 3',
    description: 'Affordable laptop with Intel Core i5 and full HD screen.',
    price: 1200,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.OWw5CaaL53n_1UXd1SH08gHaFl&pid=Api&P=0&h=180',
    ram: '8GB',
    cpu: 'Intel Core i5',
    card: 'Intel UHD Graphics',
    chip: 'Intel Core i5',
    hardDrive: '512GB SSD',
    categoryId: hpCategory.id,
  });
  
  const p34 = productsRepository.create({
    name: 'HP Omen 15 - 4',
    description: 'Gaming laptop with Intel Core i7 and NVIDIA RTX 3070.',
    price: 2200,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.m6WYTR_3OBjZMT9FxREwBwHaFF&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'NVIDIA RTX 3070',
    chip: 'Intel Core i7',
    hardDrive: '1TB SSD',
    categoryId: hpCategory.id,
  });
  
  const p35 = productsRepository.create({
    name: 'HP Elite Dragonfly - 5',
    description: 'Premium business laptop with Intel Core i7 and 4K display.',
    price: 2400,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.XAM3GSSsJUJvT30QDM0vnQHaE8&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'Intel UHD Graphics',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
    categoryId: hpCategory.id,
  });
  
  const p36 = productsRepository.create({
    name: 'HP Spectre x360 13 - 6',
    description: 'Sleek 2-in-1 with Intel Core i7 and fast SSD.',
    price: 2000,
    stockQuantity: 10,
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.fsZxYgUduDeY_ycmC0rq7wHaEr&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'Intel Iris Xe',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
    categoryId: hpCategory.id,
  });
  
  const p37 = productsRepository.create({
    name: 'HP Pavilion x360 - 7',
    description: 'Convertible laptop with Intel Core i5 and Intel UHD Graphics.',
    price: 1300,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.Kny2ps3_iGF-eCeKG9Zr8AHaFj&pid=Api&P=0&h=180',
    ram: '8GB',
    cpu: 'Intel Core i5',
    card: 'Intel UHD Graphics',
    chip: 'Intel Core i5',
    hardDrive: '1TB HDD',
    categoryId: hpCategory.id,
  });
  
  const p38 = productsRepository.create({
    name: 'HP EliteBook 850 G7 - 8',
    description: 'Business laptop with Intel Core i5 and 8GB RAM.',
    price: 1500,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.NYqPwrwNYDqKT5WHaFnTzAHaEu&pid=Api&P=0&h=180',
    ram: '8GB',
    cpu: 'Intel Core i5',
    card: 'Intel UHD Graphics',
    chip: 'Intel Core i5',
    hardDrive: '256GB SSD',
    categoryId: hpCategory.id,
  });
  
  const p39 = productsRepository.create({
    name: 'HP Elite Dragonfly 2 - 9',
    description: 'Premium business laptop with Intel Core i7 and 4K touch display.',
    price: 2700,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.i9YNEfDyNV8TK1GbzMIksAHaEg&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'Intel UHD Graphics',
    chip: 'Intel Core i7',
    hardDrive: '1TB SSD',
    categoryId: hpCategory.id,
  });
  
  const p40 = productsRepository.create({
    name: 'HP Envy x360 15 - 10',
    description: 'Versatile laptop with Intel Core i7 and AMD Radeon Graphics.',
    price: 1900,
    stockQuantity: 10,
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.nm7tqCQigiawVQKYeNB50gHaFJ&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Intel Core i7',
    card: 'AMD Radeon Graphics',
    chip: 'Intel Core i7',
    hardDrive: '512GB SSD',
    categoryId: hpCategory.id,
  });
  
  
  await productsRepository.save([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30, p31, p32, p33, p34, p35, p36, p37, p38, p39, p40]);
}

