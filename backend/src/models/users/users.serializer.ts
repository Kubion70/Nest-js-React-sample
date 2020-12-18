import { ModelEntity } from '../../common/serializers/model.serializer';
import { IUser } from './users.interface';
import { Expose } from 'class-transformer';
import { UserRole } from './userRole.enum';

export const defaultUserGroupsForSerializing: string[] = ['user.id'];

export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];

export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
];

export class UserEntity extends ModelEntity implements IUser {
  @Expose({ groups: ['user.id'] })
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  @Expose({ groups: ['user.password'] })
  password: string;
  role: UserRole;
}
