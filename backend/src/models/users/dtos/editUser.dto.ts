import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string | null;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}
