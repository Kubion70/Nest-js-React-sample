import {
  Get,
  Put,
  Post,
  Body,
  Controller,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
  Param,
  ParseIntPipe,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import {
  UserEntity,
  extendedUserGroupsForSerializing,
} from './users.serializer';
import { CreateUserDto, EditUserDto } from './dtos';
import { UsersService } from './users.service';
import { Auth } from '../../common/decorators/auth.decorator';

@Controller('users')
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth()
  @Get('/:id')
  async get(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<UserEntity> {
    if (id !== req.user.id) {
      throw new UnauthorizedException();
    }

    return await this.usersService.get(id);
  }

  @Post('/')
  async create(@Body() inputs: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(inputs);
  }

  @Auth()
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() inputs: EditUserDto,
    @Request() req,
  ): Promise<UserEntity> {
    if (id !== req.user.id) {
      throw new UnauthorizedException();
    }

    return await this.usersService.update(id, inputs);
  }
}
