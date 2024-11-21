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
    name: 'MacBook1',
    description: 'The MacBook Pro M1 2019 is powered by Apple\'s M1 chip. It has a 13-inch Retina display with True Tone, offering stunning colors and detail.',
    price: 3500,
    stockQuantity: 3,
    imageUrl: 'https://macone.vn/wp-content/uploads/2021/10/macbook-pro-spacegray-m1-2020.jpeg',
    ram: '8GB or 16GB: Unified memory architecture.',
    cpu: '7-core or 8-core GPU: Depends on configuration.',
    card: 'GPU integrated in M1 chip, no discrete graphics card.',
    chip: 'Apple M1: Includes CPU, GPU, and Neural Engine on a single chip.',
    hardDrive: 'SSD: 256GB, 512GB, 1TB or 2TB options.',
    categoryId: macBookCategory.id,
  });
  
  const p2 = productsRepository.create({
    name: 'MacBook2',
    description: 'The MacBook Pro M1 offers the best of both worlds: powerful performance and excellent battery life. Its design is sleek and portable.',
    price: 5100,
    stockQuantity: 10,
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIF.EPY4dN5ERfPQNZX4VOFwwQ&pid=Api&P=0&h=180',
    ram: '8GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '512GB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p3 = productsRepository.create({
    name: 'MacBook3',
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
    name: 'MacBook4',
    description: 'The MacBook Pro M1 2019 features a sleek design and advanced capabilities with an 8-core CPU and 8-core GPU.',
    price: 5300,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIF.L9nJ1BG26LOOXn0gYJjhDg&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '512GB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p5 = productsRepository.create({
    name: 'MacBook5',
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
    name: 'MacBook6',
    description: 'The MacBook Pro M1 is designed for professionals who need high performance and a sleek, portable design.',
    price: 5500,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIF.flVwhgNk2NAHQ6zEc%2bmpzQ&pid=Api&P=0&h=180',
    ram: '16GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '2TB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p7 = productsRepository.create({
    name: 'MacBook7',
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
    name: 'MacBook8',
    description: 'The MacBook Pro M1 is known for its blazing-fast performance and incredible battery life.',
    price: 5700,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIF.yl%2fuLMBvjHNjb6Bld91nww&pid=Api&P=0&h=180',
    ram: '32GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '512GB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p9 = productsRepository.create({
    name: 'MacBook9',
    description: 'A great option for users who require performance and portability. The MacBook Pro M1 2019 is a versatile, all-purpose laptop.',
    price: 5800,
    stockQuantity: 10,
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.GFn%2fIGfPm6oXHXEsoVPt0w&pid=Api&P=0&h=180',
    ram: '32GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '1TB SSD',
    categoryId: macBookCategory.id,
  });
  
  const p10 = productsRepository.create({
    name: 'MacBook10',
    description: 'The MacBook Pro M1 is the best choice for creative professionals looking for exceptional performance in a thin, light laptop.',
    price: 5900,
    stockQuantity: 10,
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIF.QDpfIRasuElq6BXX7C%2frYg&pid=Api&P=0&h=180',
    ram: '32GB',
    cpu: 'Apple M1',
    card: 'Apple M1 GPU',
    chip: 'Apple M1 Chip',
    hardDrive: '2TB SSD',
    categoryId: macBookCategory.id,
  });

  // Asus Products
const p11 = productsRepository.create({
  name: 'Asus1',
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
  name: 'Asus2',
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
  name: 'Asus3',
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
  name: 'Asus4',
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
  name: 'Asus5',
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
  name: 'Asus6',
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
  name: 'Asus7',
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
  name: 'Asus8',
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
  name: 'Asus9',
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
  name: 'Asus10',
  description: 'A stylish and powerful laptop with Intel Core i7 and 16GB of RAM, designed for productivity.',
  price: 1650,
  stockQuantity: 15,
  imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.jS0ZSTUH-wN89t1xbH-oZgHaHa&pid=Api&P=0&h=180',
  ram: '16GB',
  cpu: 'Intel Core i7',
  card: 'NVIDIA GeForce MX250',
  chip: 'Intel Core i7',
  hardDrive: '2TB SSD',
  categoryId: asusCategory.id,
});


  // MSI Products
const p21 = productsRepository.create({
  name: 'MSI1',
  description: 'Powerful gaming laptop with Intel Core i9 and NVIDIA RTX 3080, perfect for high-end gaming and professional graphic tasks.',
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
  name: 'MSI2',
  description: 'Top-tier gaming laptop featuring Intel Core i9 and fast SSD, designed for the ultimate gaming experience.',
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
  name: 'MSI3',
  description: 'Slim and portable gaming laptop with Intel Core i7 and NVIDIA RTX 3070, offering great performance for gaming and on-the-go productivity.',
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
  name: 'MSI4',
  description: 'Compact and lightweight gaming laptop with Intel Core i7 and GTX 1660 Ti, perfect for gamers who need mobility without sacrificing performance.',
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
  name: 'MSI5',
  description: 'Affordable yet powerful gaming laptop with Intel Core i7 and GTX 1650, suitable for gamers on a budget.',
  price: 1500,
  stockQuantity: 10,
  imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.pM4GF1f-VFDfqN3XpA_GxgHaD_&pid=Api&P=0&h=180',
  ram: '8GB',
  cpu: 'Intel Core i7',
  card: 'NVIDIA GTX 1650',
  chip: 'Intel Core i7',
  hardDrive: '512GB SSD',
  categoryId: msiCategory.id,
});

const p26 = productsRepository.create({
  name: 'MSI6',
  description: 'Gaming laptop with Intel Core i7 and powerful graphics, featuring NVIDIA GTX 1660 Ti, designed for serious gamers.',
  price: 1900,
  stockQuantity: 10,
  imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.tx_1X0LYUthLM7r150G-7wHaEw&pid=Api&P=0&h=180',
  ram: '16GB',
  cpu: 'Intel Core i7',
  card: 'NVIDIA GTX 1660 Ti',
  chip: 'Intel Core i7',
  hardDrive: '1TB SSD',
  categoryId: msiCategory.id,
});

const p27 = productsRepository.create({
  name: 'MSI7',
  description: 'Perfect for content creators with Intel Core i9 and RTX 2080, the MSI Creator 17 offers a high-resolution screen and powerful processing capabilities.',
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
  name: 'MSI8',
  description: 'Ultimate performance with Intel Core i9 and RTX 3090, the MSI GT76 Titan is engineered for the most demanding tasks, including VR and software development.',
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
  name: 'MSI9',
  description: 'Affordable gaming laptop with AMD Ryzen 7 and Radeon RX 5600M, the MSI Alpha 15 is designed for gamers looking for great performance at a lower price point.',
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
  name: 'MSI10',
  description: 'Great gaming performance with Intel Core i7 and GTX 1660 Ti, the MSI GL75 Leopard offers a large display and high-quality graphics for immersive gaming.',
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

  
  // HP Products
const p31 = productsRepository.create({
  name: 'HP1',
  description: 'Premium 2-in-1 laptop with Intel Core i7 and long battery life, perfect for professionals on the go.',
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
  name: 'HP2',
  description: 'Slim laptop with Intel Core i7 and a 4K display, offering stunning visuals for entertainment and work.',
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
  name: 'HP3',
  description: 'Affordable laptop with Intel Core i5 and full HD screen, designed for students and everyday tasks.',
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
  name: 'HP4',
  description: 'Gaming laptop with Intel Core i7 and NVIDIA RTX 3070, offering top-tier performance for gaming enthusiasts.',
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
  name: 'HP5',
  description: 'Premium business laptop with Intel Core i7 and 4K display, built for productivity and multimedia.',
  price: 2400,
  stockQuantity: 10,
  imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.u2Ps3kpEONj-lAMUsOmPxgHaGS&pid=Api&P=0&h=180',
  ram: '16GB',
  cpu: 'Intel Core i7',
  card: 'Intel UHD Graphics',
  chip: 'Intel Core i7',
  hardDrive: '512GB SSD',
  categoryId: hpCategory.id,
});

const p36 = productsRepository.create({
  name: 'HP6',
  description: 'Sleek 2-in-1 laptop with Intel Core i7 and a fast SSD, perfect for multitasking and creative work.',
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
  name: 'HP7',
  description: 'Convertible laptop with Intel Core i5 and Intel UHD Graphics, designed for versatile use.',
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
  name: 'HP8',
  description: 'Business laptop with Intel Core i5 and 8GB RAM, built for reliability and performance.',
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
  name: 'HP9',
  description: 'Premium business laptop with Intel Core i7 and 4K touch display, perfect for professionals needing high performance.',
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
  name: 'HP10',
  description: 'Versatile laptop with Intel Core i7 and AMD Radeon Graphics, built for entertainment and productivity.',
  price: 1900,
  stockQuantity: 10,
  imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.TmdVZty6FfKab0vUeFwvaAHaEm&pid=Api&P=0&h=180',
  ram: '16GB',
  cpu: 'Intel Core i7',
  card: 'AMD Radeon Graphics',
  chip: 'Intel Core i7',
  hardDrive: '512GB SSD',
  categoryId: hpCategory.id,
});
  await productsRepository.save([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30, p31, p32, p33, p34, p35, p36, p37, p38, p39, p40]);
}

