import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { RoleEnum } from 'src/common/enum/enum';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['password'] as const),
) {
    role: RoleEnum;
}
