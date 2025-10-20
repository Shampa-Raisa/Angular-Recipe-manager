import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe | undefined;

  constructor(private slService: ShoppingListService) {}

  addToShoppingList() {
    if (this.recipe && this.recipe.ingredients) {
      this.slService.addIngredients(this.recipe.ingredients);
    }
  }
}
 