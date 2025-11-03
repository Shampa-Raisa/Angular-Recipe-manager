import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 1,
      name: 'Tomato Pasta',
      description: 'Simple and tasty tomato pasta.',
      imagePath: 'https://bing.com/th?id=OSK.186ed452e115c697458ec37329fb88a8',
      ingredients: [{ name: 'Pasta', amount: 200 }, { name: 'Tomato', amount: 2 }]
    },
    {
      id: 2,
      name: 'Veg Sandwich',
      description: 'Healthy veg sandwich with chutney.',
      imagePath: 'https://bing.com/th?id=OSK.fcfa067b409fa687fd7a936d3a6b2a1a',
      ingredients: [{ name: 'Bread', amount: 4 }, { name: 'Lettuce', amount: 1 }]
    }
  ];

  getAll() {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

addRecipe(recipe: Recipe) {
  // Assign a new id automatically (simple example)
  recipe.id = this.recipes.length > 0 ? Math.max(...this.recipes.map(r => r.id)) + 1 : 1;
  this.recipes.push(recipe);
}

updateRecipe(id: number, updatedRecipe: Recipe) {
  const index = this.recipes.findIndex(r => r.id === id);
  if (index !== -1) {
    this.recipes[index] = updatedRecipe;
  }
}
}
