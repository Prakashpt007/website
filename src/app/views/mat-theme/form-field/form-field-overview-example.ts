import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Simple form field */
@Component({
	selector: 'form-field-overview-example',
	template: `

	<mat-form-field>
	<mat-label>Input</mat-label>
	<input matInput>
	</mat-form-field>
	<mat-form-field>
	<mat-label>Select</mat-label>
	<mat-select>
		<mat-option value="one">First option</mat-option>
		<mat-option value="two">Second option</mat-option>
	</mat-select>
	</mat-form-field>
	<mat-form-field>
	<mat-label>Textarea</mat-label>
	<textarea matInput></textarea>
	</mat-form-field>


	`,
	styles: `

	:host {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	}


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class FormFieldOverviewExample { }
