import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from './products.serializer';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { ParseIntOrLeaveEmptyPipe } from '../../common/pipes/parseIntOrLeaveEmpty.pipe';
import { CreateProductDto } from './dtos/createProduct.dto';
import { Auth } from '../../common/decorators/auth.decorator';
import { UserRole } from '../users/userRole.enum';
import { EditProductDto } from './dtos/editProduct.dto';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    return await this.productsService.get(id);
  }

  @Get('/')
  @ApiImplicitQuery({
    name: 'take',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'skip',
    required: false,
  })
  async getPaged(
    @Query('take', ParseIntOrLeaveEmptyPipe) take?: number | null,
    @Query('skip', ParseIntOrLeaveEmptyPipe) skip?: number | null,
  ): Promise<ProductEntity[]> {
    return await this.productsService.getPaged(skip || 0, take || 0);
  }

  @Post('/')
  @Auth(UserRole.ADMIN)
  async create(
    @Body() inputs: CreateProductDto,
    @Request() req,
  ): Promise<ProductEntity> {
    return await this.productsService.create(inputs, req.user);
  }

  @Put('/:id')
  @Auth(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() inputs: EditProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.update(id, inputs);
  }
}
