import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Select with custom trigger text */
@Component({
	selector: 'select-custom-trigger-example',
	template: `
	<h6>Select with custom trigger text</h6>
	<mat-form-field>
		<mat-label>Toppings</mat-label>
		<mat-select [formControl]="toppings" multiple>
			<mat-select-trigger>
			{{toppings.value?.[0] || ''}}
			@if ((toppings.value?.length || 0) > 1) {
				<span class="example-additional-selection">
				(+{{(toppings.value?.length || 0) - 1}} {{toppings.value?.length === 2 ? 'other' : 'others'}})
				</span>
			}
			</mat-select-trigger>
			@for (topping of toppingList; track topping) {
		<mat-option [value]="topping">{{topping}}</mat-option>
		}
		</mat-select>
	</mat-form-field>


	`,
	styles: `

	.example-additional-selection {
		opacity: 0.75;
		font-size: 0.75em;
	}

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class SelectCustomTriggerExample {
	toppings = new FormControl('');

	toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}
