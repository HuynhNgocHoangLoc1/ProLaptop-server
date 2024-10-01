import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { GenderEnum, RoleEnum } from 'src/common/enum/enum';

export async function seedUsers(usersRepository: Repository<User>) {
  const user1 = usersRepository.create({
    userName: 'john_doe',
    password: '123456789',
    email: 'john.doe@example.com',
    gender: GenderEnum.MALE,
    address: '123 Elm Street, Springfield',
    phoneNumber: '123-456-7890',
    avatar: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',
    role: RoleEnum.USER,
  });
  const user2 = usersRepository.create({
    userName: 'jane_smith',
    password: '123456789',
    email: 'jane.smith@example.com',
    gender: GenderEnum.FEMALE,
    address: '456 Oak Avenue, Metropolis',
    phoneNumber: '234-567-8901',
    avatar: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',
    role: RoleEnum.USER,
  });
  const user3 = usersRepository.create({
    userName: 'loc',
    password: '123',
    email: 'jane.smith@example.com',
    gender: GenderEnum.FEMALE,
    address: '456 Oak Avenue, Metropolis',
    phoneNumber: '234-567-8901',
    avatar: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',
    role: RoleEnum.USER,
  });
  // Add more users as needed...
  
  await usersRepository.save([user1, user2, user3]);
}
