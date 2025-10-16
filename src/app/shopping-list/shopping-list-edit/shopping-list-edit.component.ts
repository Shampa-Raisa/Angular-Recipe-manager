import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html'
})
export class ShoppingListEditComponent {
  constructor(private slService: ShoppingListService) {}

  onAdd(form: NgForm) {
    const value = form.value;
    this.slService.addIngredient({ name: value.name, amount: value.amount });
    form.reset();
  }
}
