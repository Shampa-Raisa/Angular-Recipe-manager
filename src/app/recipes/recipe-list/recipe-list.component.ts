import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  private subscription!: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.getAll();
        // Subscribe to changes
    this.subscription = this.recipeService.recipesChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

 onSelect(recipe: Recipe) {
    const currentUrl = this.router.url;
    if (currentUrl.endsWith(`/${recipe.id}`)) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.router.navigate([recipe.id], { relativeTo: this.route });
    }
  }
}
