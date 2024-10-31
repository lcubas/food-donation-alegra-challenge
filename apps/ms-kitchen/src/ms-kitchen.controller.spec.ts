import { Test, TestingModule } from '@nestjs/testing';
import { MsKitchenController } from './ms-kitchen.controller';
import { MsKitchenService } from './ms-kitchen.service';

describe('MsKitchenController', () => {
  let msKitchenController: MsKitchenController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MsKitchenController],
      providers: [MsKitchenService],
    }).compile();

    msKitchenController = app.get<MsKitchenController>(MsKitchenController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(msKitchenController.getHello()).toBe('Hello World!');
    });
  });
});
