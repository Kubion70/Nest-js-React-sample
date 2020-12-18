import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './users.serializer';
import { CreateUserDto, EditUserDto } from './dtos';
import { CryptoHelper } from '../../common/helpers/crypto.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async get(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserEntity | null> {
    return await this.usersRepository.get(
      id,
      relations,
      throwsException,
    );
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    return await this.usersRepository
      .createQueryBuilder('u')
      .where('u.username = :username', { username: username })
      .getOne()
      .then((entity) => {
        if (!entity) {
          return null;
        } else {
          return this.usersRepository.transform(entity);
        }
      });
  }

  async create(inputs: CreateUserDto): Promise<UserEntity> {
    inputs.password = CryptoHelper.sha256(inputs.password);
    return await this.usersRepository.createEntity(inputs);
  }

  async update(userId: number, inputs: EditUserDto): Promise<UserEntity> {
    const entity = await this.usersRepository.get(userId, [], false);

    inputs.password = !inputs.password
      ? entity.password
      : CryptoHelper.sha256(inputs.password);

    return await this.usersRepository.updateEntity(entity, inputs);
  }
}
