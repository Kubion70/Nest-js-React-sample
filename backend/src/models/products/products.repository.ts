import { EntityRepository } from 'typeorm';
import { ModelRepository } from '../model.repository';
import { Product } from './products.entity';
import { ProductEntity } from './products.serializer';

@EntityRepository(Product)
export class ProductsRepository extends ModelRepository<
  Product,
  ProductEntity
> {}
