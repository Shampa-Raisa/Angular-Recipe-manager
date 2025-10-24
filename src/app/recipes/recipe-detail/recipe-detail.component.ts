import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe | undefined;
  showDropdown = false; // dropdown visible toggle er jonno

  constructor(private slService: ShoppingListService, private router: Router) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onEditRecipe() {
    console.log('Edit recipe clicked');
    // Example: navigate to edit page if routing setup ache
    this.router.navigate(['/recipes', this.recipe?.id, 'edit']);
  }

  onDeleteRecipe() {
    console.log('Delete recipe clicked');
    // Future scope: recipe delete logic
  }

  addToShoppingList() {
    if (this.recipe && this.recipe.ingredients) {
      this.slService.addIngredients(this.recipe.ingredients);
      console.log('Ingredients added to shopping list');
    }
  }
}
