import { IUser } from '../users/users.interface';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdBy: IUser;
  createdAt: Date;
}
