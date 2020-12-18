import { ModelEntity } from '../../common/serializers/model.serializer';
import { IProduct } from './products.interface';
import { IUser } from '../users/users.interface';

export class ProductEntity extends ModelEntity implements IProduct {
  id: number;
  description: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;
  createdBy: IUser;
}
