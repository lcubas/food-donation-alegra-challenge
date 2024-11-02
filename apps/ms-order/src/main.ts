import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { MsOrderModule } from './ms-order.module';

// TODO: Consider using an API Gateway
async function bootstrap() {
  const app = await NestFactory.create(MsOrderModule);
  const config = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      noAck: false,
      urls: [process.env.AMQP_URL],
      queue: process.env.AMQP_ORDER_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(config.get<number>('PORT', 3000));
}

bootstrap();
