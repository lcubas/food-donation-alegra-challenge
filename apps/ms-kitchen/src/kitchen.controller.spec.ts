import { Test, TestingModule } from '@nestjs/testing';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';

describe('MsKitchenController', () => {
  let controller: KitchenController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KitchenController],
      providers: [KitchenService],
    }).compile();

    controller = app.get<KitchenController>(KitchenController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(controller.getHello()).toBe('Hello World!');
    });
  });
});
