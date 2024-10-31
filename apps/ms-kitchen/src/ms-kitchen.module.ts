import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MsKitchenController } from './ms-kitchen.controller';
import { MsKitchenService } from './ms-kitchen.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [MsKitchenController],
  providers: [MsKitchenService],
})
export class MsKitchenModule {}
