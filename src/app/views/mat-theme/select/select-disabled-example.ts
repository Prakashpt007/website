import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

/** @title Disabled select */
@Component({
	selector: 'select-disabled-example',
	template: `
	<h6>Disabled select</h6>
	<p>
		<mat-checkbox [formControl]="disableSelect">Disable select</mat-checkbox>
	</p>

	<h6>mat-select</h6>
	<mat-form-field>
		<mat-label>Choose an option</mat-label>
		<mat-select [disabled]="disableSelect.value">
			<mat-option value="option1">Option 1</mat-option>
			<mat-option value="option2" disabled>Option 2 (disabled)</mat-option>
			<mat-option value="option3">Option 3</mat-option>
		</mat-select>
	</mat-form-field>

	<h6>native html select</h6>
	<mat-form-field>
		<mat-label>Choose an option</mat-label>
		<select matNativeControl [disabled]="disableSelect.value">
			<option value="" selected></option>
			<option value="volvo">Volvo</option>
			<option value="saab" disabled>Saab</option>
			<option value="mercedes">Mercedes</option>
			<option value="audi">Audi</option>
		</select>
	</mat-form-field>



	`,
	standalone: true,
	imports: [
		MatCheckboxModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
	],
})
export class SelectDisabledExample {
	disableSelect = new FormControl(false);
}
