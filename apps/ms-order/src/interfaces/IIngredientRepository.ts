import { Ingredient } from "../models/Ingredient";

export interface IIngredientRepository {
  findAll(): Promise<Ingredient[]>;
}
