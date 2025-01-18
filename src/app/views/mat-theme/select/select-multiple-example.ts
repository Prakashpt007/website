import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Select with multiple selection */
@Component({
	selector: 'select-multiple-example',
	template: `
	<h6>Select with multiple selection</h6>
	<mat-form-field>
		<mat-label>Toppings</mat-label>
		<mat-select [formControl]="toppings" multiple>
			@for (topping of toppingList; track topping) {
			<mat-option [value]="topping">{{topping}}</mat-option>
			}
		</mat-select>
	</mat-form-field>


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class SelectMultipleExample {
	toppings = new FormControl('');
	toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}
