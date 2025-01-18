import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Form field with hints */
@Component({
	selector: 'form-field-hint-example',
	template: `
	<h6>Form field with hints</h6>
	<div class="example-container">
	<mat-form-field hintLabel="Max 10 characters">
		<mat-label>Enter some input</mat-label>
		<input matInput #input maxlength="10" placeholder="Ex. Nougat">
		<mat-hint align="end">{{input.value.length}}/10</mat-hint>
	</mat-form-field>

	<mat-form-field>
		<mat-label>Select me</mat-label>
		<mat-select>
		<mat-option value="option">Option</mat-option>
		</mat-select>
		<mat-hint align="end">Here's the dropdown arrow ^</mat-hint>
	</mat-form-field>
	</div>


	`,
	styles: `
	.example-container mat-form-field + mat-form-field {
		margin-left: 8px;
	}

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class FormFieldHintExample { }
