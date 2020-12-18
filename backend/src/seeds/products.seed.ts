import { IProduct } from '../models/products/products.interface';

export const ProductsSeed: IProduct[] = [
  {
    name: 'Sample Product 1',
    description: 'Description',
    price: 12.34,
    quantity: 1000,
    createdAt: new Date(),
    createdBy: { id: 1 } as any,
  },
  {
    name: 'Sample Product 2',
    description: 'Description',
    price: 43.21,
    quantity: 243,
    createdAt: new Date(),
    createdBy: { id: 1 } as any,
  },
];
