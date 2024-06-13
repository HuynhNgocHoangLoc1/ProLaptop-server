import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { RoleEnum } from 'src/common/enum/enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    password: string;
    role: RoleEnum;
}
