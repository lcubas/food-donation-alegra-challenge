import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

describe('MsInventoryController', () => {
  let controller: InventoryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService],
    }).compile();

    controller = app.get<InventoryController>(InventoryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(msInventoryController.getHello()).toBe('Hello World!');
    });
  });
});
