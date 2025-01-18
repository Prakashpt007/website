import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

/**
 * @title Input with hints
 */
@Component({
	selector: 'input-hint-example',
	template: `
	<h6>Input with hints</h6>
	<form class="example-form">
	<mat-form-field class="example-full-width">
		<mat-label>Message</mat-label>
		<input matInput #message maxlength="256" placeholder="Ex. I need help with...">
		<mat-hint align="start"><strong>Don't disclose personal info</strong> </mat-hint>
		<mat-hint align="end">{{message.value.length}} / 256</mat-hint>
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
	imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class InputHintExample { }
