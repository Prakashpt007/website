import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

/**
 * @title Inputs with prefixes and suffixes
 */
@Component({
	selector: 'input-prefix-suffix-example',
	template: `
	<h6>puts with prefixes and suffixes</h6>
	<form class="example-form">
	<mat-form-field class="example-full-width">
		<mat-label>Telephone</mat-label>
		<span matTextPrefix>+1 &nbsp;</span>
		<input type="tel" matInput placeholder="555-555-1234">
		<mat-icon matSuffix>mode_edit</mat-icon>
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
	imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
})
export class InputPrefixSuffixExample { }
