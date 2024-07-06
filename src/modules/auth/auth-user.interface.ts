import { User } from 'src/entities/user.entity';

export interface AuthenticatedUser extends User {
    accessToken?: string;
}
