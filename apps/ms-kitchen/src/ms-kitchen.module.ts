import { Module } from '@nestjs/common';
import { MsKitchenController } from './ms-kitchen.controller';
import { MsKitchenService } from './ms-kitchen.service';

@Module({
  imports: [],
  controllers: [MsKitchenController],
  providers: [MsKitchenService],
})
export class MsKitchenModule {}
