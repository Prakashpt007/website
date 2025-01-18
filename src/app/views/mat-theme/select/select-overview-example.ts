import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Food {
	value: string;
	viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
	selector: 'select-overview-example',
	template: `
	<h6>Basic select</h6>
	<h6>Basic mat-select</h6>
	<mat-form-field>
	<mat-label>Favorite food</mat-label>
	<mat-select>
		@for (food of foods; track food) {
		<mat-option [value]="food.value">{{food.viewValue}}</mat-option>
		}
	</mat-select>
	</mat-form-field>

	<h6>Basic native select</h6>
	<mat-form-field>
	<mat-label>Cars</mat-label>
	<select matNativeControl required>
		<option value="volvo">Volvo</option>
		<option value="saab">Saab</option>
		<option value="mercedes">Mercedes</option>
		<option value="audi">Audi</option>
	</select>
	</mat-form-field>


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
})
export class SelectOverviewExample {
	foods: Food[] = [
		{value: 'steak-0', viewValue: 'Steak'},
		{value: 'pizza-1', viewValue: 'Pizza'},
		{value: 'tacos-2', viewValue: 'Tacos'},
	];
}
