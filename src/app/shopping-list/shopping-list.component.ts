import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private sub!: Subscription;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.sub = this.slService.ingredientsChanged.subscribe((ings) => {
      this.ingredients = ings;
    });
  }
    onEdit(index: number) {
    // tell the edit component which item to edit
    this.slService.startedEditing.next(index);
  }

  onRemove(index: number) {
    this.slService.removeIngredient(index);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

