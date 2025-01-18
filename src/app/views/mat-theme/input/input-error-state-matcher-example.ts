import {Component} from '@angular/core';
import {
	FormControl,
	FormGroupDirective,
	NgForm,
	Validators,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
	selector: 'input-error-state-matcher-example',
	template: `
	<h6>Input with a custom ErrorStateMatcher</h6>
	<form class="example-form">
		<mat-form-field class="example-full-width">
			<mat-label>Email</mat-label>
			<input type="email" matInput [formControl]="emailFormControl" [errorStateMatcher]="matcher"
				placeholder="Ex. pat@example.com">
			<mat-hint>Errors appear instantly!</mat-hint>
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
export class InputErrorStateMatcherExample {
	emailFormControl = new FormControl('', [Validators.required, Validators.email]);

	matcher = new MyErrorStateMatcher();
}
