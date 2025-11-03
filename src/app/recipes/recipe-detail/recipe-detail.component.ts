import { Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe | undefined;
  id: number = 0;
  showDropdown = false; // dropdown visible toggle er jonno

  constructor(private slService: ShoppingListService, private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
      if (!this.recipe) {
        this.router.navigate(['/recipes']);  // Redirect if not found
      }
    });
  } 
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

onEditRecipe() {
  console.log('Edit recipe clicked');
  this.router.navigate(['/recipes', this.id, 'edit']);
  this.showDropdown = false;
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
