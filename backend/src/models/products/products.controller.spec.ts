import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './products.serializer';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UserPayloadDto } from '../../auth/dtos/userPayload.dto';
import { UserRole } from '../users/userRole.enum';

describe('productsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;

  beforeEach(() => {
    productsRepository = new ProductsRepository();
    productsService = new ProductsService(productsRepository);
    productsController = new ProductsController(productsService);
  });

  describe('Methods', () => {
    it("'getPaged' should return all products", async () => {
      const result: ProductEntity[] = [
        {
          id: 1,
          description: 'Test',
          name: 'Test',
          price: 12.34,
          quantity: 1000,
          createdAt: new Date(),
          createdBy: undefined,
        },
      ];
      jest
        .spyOn(productsService, 'getPaged')
        .mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await productsController.getPaged()).toBe(result);
    });

    it('should return created product with assigned id', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test',
        description: 'Test',
        price: 12.34,
        quantity: 1000,
      };

      const user: UserPayloadDto = {
        username: 'Test user',
        id: 1,
        role: UserRole.ADMIN,
      };

      const result: ProductEntity = {
        id: 1,
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        quantity: createProductDto.quantity,
        createdAt: new Date(),
        createdBy: undefined,
      };

      jest
        .spyOn(productsService, 'create')
        .mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await productsController.create(createProductDto, { user })).toBe(
        result,
      );
    });
  });
});
