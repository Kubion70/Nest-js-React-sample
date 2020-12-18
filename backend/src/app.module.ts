import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './models/products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, ProductsModule],
})
export class AppModule {}
