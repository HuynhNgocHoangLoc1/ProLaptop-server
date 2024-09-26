import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';

export async function seedCategories(categoryRepository: Repository<Category>) {
  const category1 = categoryRepository.create({
    name: 'Asus',
    description: 'Asus products',
    iconUrl: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',
  });
  const category2 = categoryRepository.create({
    name: 'MacBook',
    description: 'MacBook products',
    iconUrl: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',

  });
  const category3 = categoryRepository.create({
    name: 'HP',
    description: 'HP products',
    iconUrl: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',

  });
  const category4 = categoryRepository.create({
    name: 'Lenovo',
    description: 'Lenovo products',
    iconUrl: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',

  });
  const category5 = categoryRepository.create({
    name: 'Acer',
    description: 'Acer products',
    iconUrl: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',
  });
  
  await categoryRepository.save([category1, category2, category3, category4, category5]);
}
