import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { MS_KITCHEN_CLIENT_NAME } from '@app/libs/shared';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseConnectionConfig } from './mongoose/MongooseConnectionConfig';
import { Order, OrderSchema } from './models/Order';
import { Recipe, RecipeSchema } from './models/Recipe';
import { OrderRepository } from './repositories/OrderRepository';
import { RecipeRepository } from './repositories/RecipeRepository';
import { Ingredient, IngredientSchema } from './models/Ingredient';
import { RecipeController } from './recipe.controller';
import { IngredientController } from './ingredient.controller';
import { IngredientRepository } from './repositories/IngredientRepository';
import { RecipeService } from './recipe.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: MS_KITCHEN_CLIENT_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: process.env.AMQP_MS_KITCHEN_QUEUE,
        },
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConnectionConfig,
    }),
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Recipe.name, schema: RecipeSchema },
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [
    OrderController,
    RecipeController,
    IngredientController,
  ],
  providers: [
    OrderService,
    RecipeService,
    OrderRepository,
    RecipeRepository,
    IngredientRepository,
  ],
})
export class MsOrderModule {}
