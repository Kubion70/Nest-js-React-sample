import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './products.serializer';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UserPayloadDto } from '../../auth/dtos/userPayload.dto';
import { EditProductDto } from './dtos/editProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async get(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<ProductEntity | null> {
    return await this.productsRepository.get(id, relations, throwsException);
  }

  async getPaged(skip: number, take: number): Promise<ProductEntity[]> {
    return await this.productsRepository
      .createQueryBuilder('products')
      .skip(skip)
      .take(take)
      .getMany()
      .then((result) => {
        return this.productsRepository.transformMany(result);
      });
  }

  async create(
    inputs: CreateProductDto,
    user: UserPayloadDto,
  ): Promise<ProductEntity> {
    inputs.createdAt = new Date();
    inputs.createdBy = { id: user.id };
    return await this.productsRepository.createEntity(inputs);
  }

  async update(
    productId: number,
    inputs: EditProductDto,
  ): Promise<ProductEntity> {
    const entity = await this.productsRepository.get(productId, [], false);

    return await this.productsRepository.updateEntity(entity, inputs);
  }
}
