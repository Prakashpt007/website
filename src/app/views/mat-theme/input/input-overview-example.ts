import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

/**
 * @title Basic Inputs
 */
@Component({
	selector: 'input-overview-example',
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
	template: `
	<h6>Basic Inputs</h6>
	<form class="example-form">
	<mat-form-field class="example-full-width">
		<mat-label>Favorite food</mat-label>
		<input matInput placeholder="Ex. Pizza" value="Sushi">
	</mat-form-field>

	<mat-form-field class="example-full-width">
		<mat-label>Leave a comment</mat-label>
		<textarea matInput placeholder="Ex. It makes me feel..."></textarea>
	</mat-form-field>
	</form>


	`,
	standalone: true,
	imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class InputOverviewExample { }
