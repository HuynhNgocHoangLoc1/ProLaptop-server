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
    userName: 'admin',
    password: '12344',
    email: 'lochnhgcd201574@fpt.edu.vn',
    gender: GenderEnum.FEMALE,
    address: '456 Oak Avenue, Metropolis',
    phoneNumber: '234-567-8901',
    avatar: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',
    role: RoleEnum.ADMIN,
  });
  const user3 = usersRepository.create({
    userName: 'Loc',
    password: '123',
    email: 'huynhngochoangloc0211102@gmail.com',
    gender: GenderEnum.MALE,
    address: '135 Nguyen Phuoc Nguyen',
    phoneNumber: '234-567-8901',
    avatar: 'https://res.cloudinary.com/dnjkwuc7p/image/upload/v1712043752/avatar/default_avatar.png',
    role: RoleEnum.USER,
  });
  
  await usersRepository.save([user1, user2, user3]);
}
