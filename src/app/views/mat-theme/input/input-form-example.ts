import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

/**
 * @title Inputs in a form
 */
@Component({
	selector: 'input-form-example',
	template: `
	<h6>Inputs in a form</h6>
	<form class="example-form">
	<mat-form-field class="example-full-width">
		<mat-label>Company (disabled)</mat-label>
		<input matInput disabled value="Google">
	</mat-form-field>

	<table class="example-full-width" cellspacing="0"><tr>
		<td><mat-form-field class="example-full-width">
		<mat-label>First name</mat-label>
		<input matInput>
		</mat-form-field></td>
		<td><mat-form-field class="example-full-width">
		<mat-label>Long Last Name That Will Be Truncated</mat-label>
		<input matInput>
		</mat-form-field></td>
	</tr></table>

	<p>
		<mat-form-field class="example-full-width">
		<mat-label>Address</mat-label>
		<textarea matInput placeholder="Ex. 100 Main St">1600 Amphitheatre Pkwy</textarea>
		</mat-form-field>
		<mat-form-field class="example-full-width">
		<mat-label>Address 2</mat-label>
		<textarea matInput></textarea>
		</mat-form-field>
	</p>

	<table class="example-full-width" cellspacing="0"><tr>
		<td><mat-form-field class="example-full-width">
		<mat-label>City</mat-label>
		<input matInput placeholder="Ex. San Francisco">
		</mat-form-field></td>
		<td><mat-form-field class="example-full-width">
		<mat-label>State</mat-label>
		<input matInput placeholder="Ex. California">
		</mat-form-field></td>
		<td><mat-form-field class="example-full-width">
		<mat-label>Postal Code</mat-label>
		<input matInput #postalCode maxlength="5" placeholder="Ex. 94105" value="94043">
		<mat-hint align="end">{{postalCode.value.length}} / 5</mat-hint>
		</mat-form-field></td>
	</tr></table>
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

	td {
	padding-right: 8px;
	}


	`,
	standalone: true,
	imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class InputFormExample { }
