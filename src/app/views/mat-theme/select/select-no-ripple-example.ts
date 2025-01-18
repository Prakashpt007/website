import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Select with no option ripple */
@Component({
	selector: 'select-no-ripple-example',
	template: `
	<h6>Select with no option ripple</h6>
	<mat-form-field>
		<mat-label>Select an option</mat-label>
		<mat-select disableRipple>
			<mat-option value="1">Option 1</mat-option>
			<mat-option value="2">Option 2</mat-option>
			<mat-option value="3">Option 3</mat-option>
		</mat-select>
	</mat-form-field>


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule],
})
export class SelectNoRippleExample { }
