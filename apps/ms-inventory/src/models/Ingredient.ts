import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class Ingredient extends Document {
  @Prop()
  name: string;

  @Prop()
  stockQuantity: number;
}

// export type IngredientDocument = HydratedDocument<Ingredient>;

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
