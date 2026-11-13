import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserService } from './userService';

describe('UserService.changePassword', () => {
  const usersRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };
  let userService: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService(
      usersRepository as unknown as Repository<User>,
      {} as EntityManager,
      {} as CloudinaryService,
    );
  });

  it('rejects an incorrect current password without saving', async () => {
    const user = {
      id: 'user-id',
      password: await bcrypt.hash('correct-password', 4),
    } as User;
    usersRepository.findOneBy.mockResolvedValue(user);

    await expect(
      userService.changePassword(
        user.id,
        'incorrect-password',
        'new-password',
      ),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(usersRepository.save).not.toHaveBeenCalled();
  });

  it('hashes and saves the new password when the current password is correct', async () => {
    const user = {
      id: 'user-id',
      password: await bcrypt.hash('correct-password', 4),
    } as User;
    usersRepository.findOneBy.mockResolvedValue(user);
    usersRepository.save.mockResolvedValue(user);

    await userService.changePassword(
      user.id,
      'correct-password',
      'new-password',
    );

    expect(usersRepository.save).toHaveBeenCalledWith(user);
    expect(await bcrypt.compare('new-password', user.password)).toBe(true);
  });
});
