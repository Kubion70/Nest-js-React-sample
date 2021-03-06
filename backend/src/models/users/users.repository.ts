import { EntityRepository } from 'typeorm';
import { User } from './users.entity';
import { ModelRepository } from '../model.repository';
import { allUserGroupsForSerializing, UserEntity } from './users.serializer';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserEntity> {
  transform(model: User): UserEntity {
    const transformOptions = {
      groups: allUserGroupsForSerializing,
    };
    return plainToClass(
      UserEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: User[]): UserEntity[] {
    return models.map((model) => this.transform(model));
  }
}
