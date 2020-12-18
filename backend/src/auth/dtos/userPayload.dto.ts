import { UserRole } from '../../models/users/userRole.enum';

export class UserPayloadDto {
  id: number;
  username: string;
  role: UserRole;
}
