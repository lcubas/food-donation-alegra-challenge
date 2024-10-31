import { Test, TestingModule } from '@nestjs/testing';
import { MsOrderController } from './ms-order.controller';
import { MsOrderService } from './ms-order.service';

describe('MsOrderController', () => {
  let msOrderController: MsOrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MsOrderController],
      providers: [MsOrderService],
    }).compile();

    msOrderController = app.get<MsOrderController>(MsOrderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(msOrderController.getHello()).toBe('Hello World!');
    });
  });
});
