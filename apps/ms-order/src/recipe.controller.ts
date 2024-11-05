import { Controller, Get } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('/')
  async findAll() {
    return await this.recipeService.findAllRecipes();
  }
}
