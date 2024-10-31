import { NestFactory } from '@nestjs/core';
import { MsKitchenModule } from './ms-kitchen.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(MsKitchenModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT', 3001));
}

bootstrap();
