import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Snack-bar with a custom component
 */
@Component({
	selector: 'snack-bar-component-example',
	template: `
	<h6>Snack-bar with a custom component</h6>
	<mat-form-field>
		<mat-label>Snack bar duration (seconds)</mat-label>
		<input type="number" [(ngModel)]="durationInSeconds" matInput>
	</mat-form-field>

	<button mat-stroked-button (click)="openSnackBar()" aria-label="Show an example snack-bar">Pizza party</button>

	`,
	styles: `
	mat-form-field {
  		margin-right: 12px;
	}
	`,
	standalone: true,
	imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
})
export class SnackBarComponentExample {
	durationInSeconds = 5;

	constructor (private _snackBar: MatSnackBar) { }

	openSnackBar () {
		this._snackBar.openFromComponent(PizzaPartyComponent, {
			duration: this.durationInSeconds * 1000,
		});
	}
}

@Component({
	selector: 'snack-bar-component-example-snack',
	template: `
	<span class="example-pizza-party">Pizza party!!! 🍕</span>
	`,
	styles: `
    .example-pizza-party {
      color: hotpink;
    }
  `,
	standalone: true,
})
export class PizzaPartyComponent { }
