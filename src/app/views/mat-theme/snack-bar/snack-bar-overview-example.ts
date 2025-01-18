import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Basic snack-bar
 */
@Component({
	selector: 'snack-bar-overview-example',
	template: `
	<h6>Basic snack-bar</h6>
	<mat-form-field>
		<mat-label>Message</mat-label>
		<input matInput value="Disco party!" #message>
	</mat-form-field>

	<mat-form-field>
		<mat-label>Action</mat-label>
		<input matInput value="Dance" #action>
	</mat-form-field>

	<button mat-stroked-button (click)="openSnackBar(message.value, action.value)">Show snack-bar</button>
	`,
	styles: `

	mat-form-field {
  		margin-right: 12px;
	}
	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class SnackBarOverviewExample {
	constructor (private _snackBar: MatSnackBar) { }

	openSnackBar (message: string, action: string) {
		this._snackBar.open(message, action);
	}
}
