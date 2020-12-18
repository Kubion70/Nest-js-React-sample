import { ApiProperty } from '@nestjs/swagger';

export class EditProductDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty({ required: false })
  price: number;
  @ApiProperty({ required: false })
  quantity: number;
}
