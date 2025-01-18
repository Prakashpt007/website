import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Food {
	value: string;
	viewValue: string;
}

interface Car {
	value: string;
	viewValue: string;
}

/**
 * @title Basic select with initial value and no form
 */
@Component({
	selector: 'select-initial-value-example',
	template: `

	<h6>Basic mat-select with initial value</h6>
	<mat-form-field>
	<mat-label>Favorite Food</mat-label>
	<mat-select [(value)]="selectedFood">
		<mat-option></mat-option>
		@for (option of foods; track option) {
		<mat-option [value]="option.value">{{ option.viewValue }}</mat-option>
		}
	</mat-select>
	</mat-form-field>
	<p>You selected: {{selectedFood}}</p>

	<h6 class="mt-3">Basic native select with initial value</h6>
	<mat-form-field>
	<mat-label>Favorite Car</mat-label>
	<select matNativeControl (change)="selectCar($event)">
		<option value=""></option>
		@for (option of cars; track option) {
		<option [value]="option.value"
				[selected]="selectedCar === option.value">{{ option.viewValue }}</option>
		}
	</select>
	</mat-form-field>
	<p>You selected: {{selectedCar}}</p>


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
})

export class SelectInitialValueExample {
	foods: Food[] = [
		{value: 'steak-0', viewValue: 'Steak'},
		{value: 'pizza-1', viewValue: 'Pizza'},
		{value: 'tacos-2', viewValue: 'Tacos'},
	];
	cars: Car[] = [
		{value: 'ford', viewValue: 'Ford'},
		{value: 'chevrolet', viewValue: 'Chevrolet'},
		{value: 'dodge', viewValue: 'Dodge'},
	];
	selectedFood = this.foods[2].value;
	selectedCar = this.cars[0].value;

	selectCar (event: Event) {
		this.selectedCar = (event.target as HTMLSelectElement).value;
	}
}
