import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Ingredient {
  @Prop()
  name: string;

  @Prop()
  stockQuantity: number;
}

export type IngredientDocument = HydratedDocument<Ingredient>;

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
