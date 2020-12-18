import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IProduct } from './products.interface';
import { User } from '../users/users.entity';

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'money' })
  price: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => User, (user) => user.createdProducts)
  createdBy: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
