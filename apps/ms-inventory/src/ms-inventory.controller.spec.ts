import { Test, TestingModule } from '@nestjs/testing';
import { MsInventoryController } from './ms-inventory.controller';
import { MsInventoryService } from './ms-inventory.service';

describe('MsInventoryController', () => {
  let msInventoryController: MsInventoryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MsInventoryController],
      providers: [MsInventoryService],
    }).compile();

    msInventoryController = app.get<MsInventoryController>(MsInventoryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(msInventoryController.getHello()).toBe('Hello World!');
    });
  });
});
