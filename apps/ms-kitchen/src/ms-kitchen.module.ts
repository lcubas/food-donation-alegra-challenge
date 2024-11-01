import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import { MongooseConnectionConfig } from './mongoose/MongooseConnectionConfig';
import { Recipe, RecipeSchema } from './models/Recipe';
import { RecipeRepository } from './repositories/RecipeRepository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConnectionConfig,
    }),
    MongooseModule.forFeature([
      {
        name: Recipe.name,
        schema: RecipeSchema,
      },
    ]),
  ],
  controllers: [KitchenController],
  providers: [KitchenService, RecipeRepository],
})
export class MsKitchenModule {}
