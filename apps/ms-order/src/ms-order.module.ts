import { Module } from '@nestjs/common';
import { MsOrderController } from './ms-order.controller';
import { MsOrderService } from './ms-order.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '../../../.env',
        '.env',
      ],
    }),
  ],
  controllers: [MsOrderController],
  providers: [MsOrderService],
})
export class MsOrderModule {}
