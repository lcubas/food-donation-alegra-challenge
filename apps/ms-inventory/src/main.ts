import { NestFactory } from '@nestjs/core';
import { MsInventoryModule } from './ms-inventory.module';

async function bootstrap() {
  const app = await NestFactory.create(MsInventoryModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
