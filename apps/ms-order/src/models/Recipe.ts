import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export interface Ingredient {
  name: string;
  quantity: number;
}

// TODO: Define a base class from which all models extend
@Schema({ versionKey: false })
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
