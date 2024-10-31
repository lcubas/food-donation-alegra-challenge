import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MsInventoryModule } from './ms-inventory.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MsInventoryModule, {
    transport: Transport.RMQ,
    options: {
      noAck: false,
      urls: [process.env.AMQP_URL],
      queue: process.env.AMQP_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.listen();
}

bootstrap();
