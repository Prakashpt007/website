import {Component} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';

/** @title Form field with error messages */
@Component({
	selector: 'form-field-error-example',
	template: `
	<h6>Form field with error messages</h6>
	<div class="example-container">
	<mat-form-field>
		<mat-label>Enter your email</mat-label>
		<input matInput
			placeholder="pat@example.com"
			[formControl]="email"
			(blur)="updateErrorMessage()"
			required>
		@if (email.invalid) {
		<mat-error>{{errorMessage}}</mat-error>
		}
	</mat-form-field>
	</div>


	`,
	styles: `
	.example-container mat-form-field + mat-form-field {
		margin-left: 8px;
	}

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
})
export class FormFieldErrorExample {
	email = new FormControl('', [Validators.required, Validators.email]);

	errorMessage = '';

	constructor () {
		merge(this.email.statusChanges, this.email.valueChanges)
			.pipe(takeUntilDestroyed())
			.subscribe(() => this.updateErrorMessage());
	}

	updateErrorMessage () {
		if (this.email.hasError('required')) {
			this.errorMessage = 'You must enter a value';
		} else if (this.email.hasError('email')) {
			this.errorMessage = 'Not a valid email';
		} else {
			this.errorMessage = '';
		}
	}
}
