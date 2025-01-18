import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Input with error messages
 */
@Component({
	selector: 'input-errors-example',
	template: `
	<h6>Input with error messages</h6>
	<form class="example-form">
	<mat-form-field class="example-full-width">
		<mat-label>Email</mat-label>
		<input type="email" matInput [formControl]="emailFormControl" placeholder="Ex. pat@example.com">
		@if (emailFormControl.hasError('email') && !emailFormControl.hasError('required')) {
		<mat-error>Please enter a valid email address</mat-error>
		}
		@if (emailFormControl.hasError('required')) {
		<mat-error>Email is <strong>required</strong></mat-error>
		}
	</mat-form-field>
	</form>


	`,
	styles: `

	.example-form {
		min-width: 150px;
		max-width: 500px;
		width: 100%;
	}

	.example-full-width {
		width: 100%;
	}


	`,
	standalone: true,
	imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class InputErrorsExample {
	emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
