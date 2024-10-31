import { NestFactory } from '@nestjs/core';
import { MsKitchenModule } from './ms-kitchen.module';

async function bootstrap() {
  const app = await NestFactory.create(MsKitchenModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
