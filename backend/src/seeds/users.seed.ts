import { IUser } from '../models/users/users.interface';
import { CryptoHelper } from '../common/helpers/crypto.helper';
import { UserRole } from '../models/users/userRole.enum';

export const UsersSeed: IUser[] = [
  {
    username: 'admin',
    firstName: 'Admin',
    lastName: 'Admin',
    password: CryptoHelper.sha256('admin'),
    role: UserRole.ADMIN,
  },
  {
    username: 'client',
    firstName: 'Client',
    lastName: 'Client',
    password: CryptoHelper.sha256('client'),
    role: UserRole.CLIENT,
  },
];
