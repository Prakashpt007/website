import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

interface Food {
	value: string;
	viewValue: string;
}

interface Car {
	value: string;
	viewValue: string;
}

/**
 * @title Select in a form
 */
@Component({
	selector: 'select-form-example',
	template: `
	<h6>Select in a form</h6>
	<form>
	<h6>mat-select</h6>
	<mat-form-field>
		<mat-label>Favorite food</mat-label>
		<mat-select [(ngModel)]="selectedValue" name="food">
		@for (food of foods; track food) {
			<mat-option [value]="food.value">{{food.viewValue}}</mat-option>
		}
		</mat-select>
	</mat-form-field>
	<p> Selected food: {{selectedValue}} </p>

	<h6>native html select</h6>
	<mat-form-field>
		<mat-label>Favorite car</mat-label>
		<select matNativeControl [(ngModel)]="selectedCar" name="car">
		<option value="" selected></option>
		@for (car of cars; track car) {
			<option [value]="car.value">{{car.viewValue}}</option>
		}
		</select>
	</mat-form-field>
	<p> Selected car: {{selectedCar}} </p>
	</form>


	`,
	standalone: true,
	imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectFormExample {
	selectedValue!: string;
	selectedCar!: string;

	foods: Food[] = [
		{value: 'steak-0', viewValue: 'Steak'},
		{value: 'pizza-1', viewValue: 'Pizza'},
		{value: 'tacos-2', viewValue: 'Tacos'},
	];

	cars: Car[] = [
		{value: 'volvo', viewValue: 'Volvo'},
		{value: 'saab', viewValue: 'Saab'},
		{value: 'mercedes', viewValue: 'Mercedes'},
	];
}
