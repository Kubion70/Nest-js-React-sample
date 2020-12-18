import { UserRole } from './userRole.enum';

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
}
