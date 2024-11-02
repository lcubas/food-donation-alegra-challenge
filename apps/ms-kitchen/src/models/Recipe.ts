import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Ingredient {
  name: string;
  quantity: number;
}

@Schema()
export class Recipe extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [
      {
        name: String,
        quantity: Number,
      },
    ],
    required: true,
  })
  ingredients: Ingredient[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
