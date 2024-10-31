import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MsInventoryController } from './ms-inventory.controller';
import { MsInventoryService } from './ms-inventory.service';
import { MongooseConnectionConfig } from './mongoose/MongooseConnectionConfig';
import { Ingredient, IngredientSchema } from './models/Ingredient';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '../../../.env',
        '.env',
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConnectionConfig,
    }),
    MongooseModule.forFeature([
      {
        name: Ingredient.name,
        schema: IngredientSchema,
      }
    ]),
  ],
  controllers: [MsInventoryController],
  providers: [MsInventoryService],
})
export class MsInventoryModule {}
