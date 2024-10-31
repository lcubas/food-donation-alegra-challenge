import { Module } from '@nestjs/common';
import { MsInventoryController } from './ms-inventory.controller';
import { MsInventoryService } from './ms-inventory.service';

@Module({
  imports: [],
  controllers: [MsInventoryController],
  providers: [MsInventoryService],
})
export class MsInventoryModule {}
