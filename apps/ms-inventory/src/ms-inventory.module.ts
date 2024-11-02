import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { MS_KITCHEN_CLIENT_NAME, MS_ORDER_CLIENT_NAME } from '@app/libs/shared';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { MongooseConnectionConfig } from './mongoose/MongooseConnectionConfig';
import { Ingredient, IngredientSchema } from './models/Ingredient';
import { MarketApiService } from './market-api.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: MS_KITCHEN_CLIENT_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: process.env.AMQP_MS_INVENTORY_QUEUE,
        },
      },
      {
        name: MS_ORDER_CLIENT_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: process.env.AMQP_MS_ORDER_QUEUE,
        },
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConnectionConfig,
    }),
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, MarketApiService],
})
export class MsInventoryModule {}
