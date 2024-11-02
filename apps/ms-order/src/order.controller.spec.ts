import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('orderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = app.get<OrderController>(OrderController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(controller.getHello()).toBe('Hello World!');
    // });
  });
});
