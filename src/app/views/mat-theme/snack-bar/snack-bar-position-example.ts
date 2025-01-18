import {Component} from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Snack-bar with configurable position
 */
@Component({
	selector: 'snack-bar-position-example',
	template: `
	<h6>Snack-bar with configurable position</h6>
	<mat-form-field>
	<mat-label>Horizontal position</mat-label>
	<mat-select [(value)]="horizontalPosition">
		<mat-option value="start">Start</mat-option>
		<mat-option value="center">Center</mat-option>
		<mat-option value="end">End</mat-option>
		<mat-option value="left">Left</mat-option>
		<mat-option value="right">Right</mat-option>
	</mat-select>
	</mat-form-field>
	<mat-form-field>
	<mat-label>Vertical position</mat-label>
	<mat-select [(value)]="verticalPosition">
		<mat-option value="top">Top</mat-option>
		<mat-option value="bottom">Bottom</mat-option>
	</mat-select>
	</mat-form-field>

	<button mat-stroked-button (click)="openSnackBar()" aria-label="Show an example snack-bar">
	Pool party!
	</button>

	`,
	styles: `
	mat-form-field {
		margin-right: 12px;
	}

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, MatButtonModule],
})
export class SnackBarPositionExample {
	horizontalPosition: MatSnackBarHorizontalPosition = 'start';
	verticalPosition: MatSnackBarVerticalPosition = 'bottom';

	constructor (private _snackBar: MatSnackBar) { }

	openSnackBar () {
		this._snackBar.open('Cannonball!!', 'Splash', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}
}
