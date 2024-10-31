import { NestFactory } from '@nestjs/core';
import { MsInventoryModule } from './ms-inventory.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(MsInventoryModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT', 3000));
}

bootstrap();
