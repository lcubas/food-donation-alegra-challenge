import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MsOrderController } from './ms-order.controller';
import { MsOrderService } from './ms-order.service';
import { MS_INVENTORY_CLIENT_NAME } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: MS_INVENTORY_CLIENT_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: process.env.AMQP_QUEUE,
        },
      },
    ]),
  ],
  controllers: [MsOrderController],
  providers: [MsOrderService],
})
export class MsOrderModule {}
