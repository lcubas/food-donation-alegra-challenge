import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MsKitchenModule } from './ms-kitchen.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MsKitchenModule, {
    transport: Transport.RMQ,
    options: {
      noAck: false,
      urls: [process.env.AMQP_URL],
      queue: process.env.AMQP_KITCHEN_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.listen();
}

bootstrap();
