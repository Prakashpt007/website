import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Select with 2-way value binding */
@Component({
	selector: 'select-value-binding-example',
	template: `
	<h6>Select with 2-way value binding</h6>
	<mat-form-field>
	<mat-label>Select an option</mat-label>
	<mat-select [(value)]="selected">
		<mat-option>None</mat-option>
		<mat-option value="option1">Option 1</mat-option>
		<mat-option value="option2">Option 2</mat-option>
		<mat-option value="option3">Option 3</mat-option>
	</mat-select>
	</mat-form-field>

	<p>You selected: {{selected}}</p>


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule],
})
export class SelectValueBindingExample {
	selected = 'option2';
}
