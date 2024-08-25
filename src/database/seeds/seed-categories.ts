import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';

export async function seedCategories(categoryRepository: Repository<Category>) {
  const category1 = categoryRepository.create({
    name: 'Asus',
    description: 'Asus products',
  });
  const category2 = categoryRepository.create({
    name: 'MacBook',
    description: 'MacBook products',
  });
  const category3 = categoryRepository.create({
    name: 'HP',
    description: 'HP products',
  });
  const category4 = categoryRepository.create({
    name: 'Lenovo',
    description: 'Lenovo products',
  });
  const category5 = categoryRepository.create({
    name: 'Acer',
    description: 'Acer products',
  });
  
  await categoryRepository.save([category1, category2, category3, category4, category5]);
}
