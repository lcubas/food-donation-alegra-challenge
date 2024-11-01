import { NestFactory } from '@nestjs/core';
import { MsOrderModule } from './ms-order.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(MsOrderModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT', 3000));
}

bootstrap();
