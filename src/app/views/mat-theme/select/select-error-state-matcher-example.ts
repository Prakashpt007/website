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
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

/** @title Select with a custom ErrorStateMatcher */
@Component({
	selector: 'select-error-state-matcher-example',
	template: `
	<h6>Select with a custom ErrorStateMatcher</h6>
	<h6>mat-select</h6>
	<mat-form-field>
	<mat-label>Choose one</mat-label>
	<mat-select [formControl]="selected" [errorStateMatcher]="matcher">
		<mat-option>Clear</mat-option>
		<mat-option value="valid">Valid option</mat-option>
		<mat-option value="invalid">Invalid option</mat-option>
	</mat-select>
	<mat-hint>Errors appear instantly!</mat-hint>
	@if (selected.hasError('required')) {
		<mat-error>You must make a selection</mat-error>
	}
	@if (selected.hasError('pattern') && !selected.hasError('required')) {
		<mat-error>Your selection is invalid</mat-error>
	}
	</mat-form-field>

	<h6 class="mt-3">native html select</h6>
	<mat-form-field class="demo-full-width">
	<mat-label>Choose one</mat-label>
	<select matNativeControl [formControl]="nativeSelectFormControl" [errorStateMatcher]="matcher">
		<option value=""></option>
		<option value="valid" selected>Valid option</option>
		<option value="invalid">Invalid option</option>
	</select>
	@if (nativeSelectFormControl.hasError('required')) {
		<mat-error>You must make a selection</mat-error>
	}
	@if (nativeSelectFormControl.hasError('pattern') && !nativeSelectFormControl.hasError('required')) {
		<mat-error>Your selection is invalid</mat-error>
	}
	</mat-form-field>


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
})
export class SelectErrorStateMatcherExample {
	selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

	selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

	nativeSelectFormControl = new FormControl('valid', [
		Validators.required,
		Validators.pattern('valid'),
	]);

	matcher = new MyErrorStateMatcher();
}
