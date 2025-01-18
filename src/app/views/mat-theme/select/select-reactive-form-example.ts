import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
 * @title Select in a reactive form
 */
@Component({
	selector: 'select-reactive-form-example',
	template: `
	<h6>Select in a reactive form</h6>
	<form [formGroup]="form">
	<h6>mat-select</h6>
	<mat-form-field>
		<mat-label>Favorite Food</mat-label>
		<mat-select [formControl]="foodControl" name="food">
		<mat-option>None</mat-option>
		@for (food of foods; track food) {
			<mat-option [value]="food.value">{{food.viewValue}}</mat-option>
		}
		</mat-select>
	</mat-form-field>
	<p>Selected: {{foodControl.value}}</p>
	<h6>Native select</h6>
	<mat-form-field>
		<mat-label>Favorite Car</mat-label>
		<select matNativeControl [formControl]="carControl" name="car">
		<option value="">None</option>
		@for (car of cars; track car) {
			<option [value]="car.value">{{car.viewValue}}</option>
		}
		</select>
	</mat-form-field>
	<p>Selected: {{carControl.value}}</p>
	</form>


	`,
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectReactiveFormExample {
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
	foodControl = new FormControl(this.foods[2].value);
	carControl = new FormControl(this.cars[1].value);
	form = new FormGroup({
		food: this.foodControl,
		car: this.carControl,
	});
}
