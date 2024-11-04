import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MS_INVENTORY_CLIENT_NAME,
  MS_ORDER_CLIENT_NAME,
} from '@app/libs/shared';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import { MongooseConnectionConfig } from './mongoose/MongooseConnectionConfig';
import { Recipe, RecipeSchema } from './models/Recipe';
import { RecipeRepository } from './repositories/RecipeRepository';
import { Order, OrderSchema } from './models/Order';
import { OrderRepository } from './repositories/OrderRepository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: MS_INVENTORY_CLIENT_NAME,
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
      { name: Recipe.name, schema: RecipeSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [KitchenController],
  providers: [KitchenService, RecipeRepository, OrderRepository],
})
export class MsKitchenModule {}
