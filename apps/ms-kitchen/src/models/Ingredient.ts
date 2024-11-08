import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ingredient extends Document {
  @Prop()
  name: string;

  @Prop()
  stockQuantity: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
