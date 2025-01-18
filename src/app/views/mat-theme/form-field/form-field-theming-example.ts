import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Form field theming */
@Component({
	selector: 'form-field-theming-example',
	template: `
	<h6>Form field theming</h6>
	<mat-form-field [color]="colorControl.value!">
	<mat-label>Color</mat-label>
	<mat-select [formControl]="colorControl">
		<mat-option value="primary">Primary</mat-option>
		<mat-option value="accent">Accent</mat-option>
		<mat-option value="warn">Warn</mat-option>
	</mat-select>
	</mat-form-field>


	`,
	styles: `
	.example-container mat-form-field + mat-form-field {
	margin-left: 8px;
	}


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class FormFieldThemingExample {
	colorControl = new FormControl('primary' as ThemePalette);
}
