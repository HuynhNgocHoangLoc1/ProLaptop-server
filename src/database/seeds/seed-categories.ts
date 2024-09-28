import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';

export async function seedCategories(categoryRepository: Repository<Category>) {
  const category1 = categoryRepository.create({
    name: 'Asus',
    description: 'Asus products',
    iconUrl: 'https://res.cloudinary.com/dh6dvndzn/image/upload/v1727524639/spd49ftufgkc9lwnsiel.png',
  });
  const category2 = categoryRepository.create({
    name: 'MacBook',
    description: 'MacBook products',
    iconUrl: 'https://res.cloudinary.com/dh6dvndzn/image/upload/v1727524842/jrsrjjqgrlgxklqidbfs.png',

  });
  const category3 = categoryRepository.create({
    name: 'Hp',
    description: 'Hp products',
    iconUrl: 'https://res.cloudinary.com/dh6dvndzn/image/upload/v1727524919/ah4ez7dkbeprmmnedx2t.png',

  });
  const category4 = categoryRepository.create({
    name: 'Msi',
    description: 'Msi products',
    iconUrl: 'https://res.cloudinary.com/dh6dvndzn/image/upload/v1727525068/duzfdgrrfbyybf55y8hu.png',

  });

  await categoryRepository.save([category1, category2, category3, category4]);
}
