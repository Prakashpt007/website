import {Component} from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

/**
 * @title MatRipple basic usage
 */
@Component({
	selector: 'ripple-overview-example',
	template: `
	<h6>MatRipple basic usage</h6>
	<mat-checkbox [(ngModel)]="centered" class="example-ripple-checkbox">Centered</mat-checkbox>
	<mat-checkbox [(ngModel)]="disabled" class="example-ripple-checkbox">Disabled</mat-checkbox>
	<mat-checkbox [(ngModel)]="unbounded" class="example-ripple-checkbox">Unbounded</mat-checkbox>

	<mat-form-field class="example-ripple-form-field">
		<mat-label>Radius</mat-label>
		<input matInput [(ngModel)]="radius" type="number">
	</mat-form-field>
	<mat-form-field class="example-ripple-form-field">
		<mat-label>Color</mat-label>
		<input matInput [(ngModel)]="color" type="text">
	</mat-form-field>


	<div class="example-ripple-container mat-elevation-z4"
		matRipple
		[matRippleCentered]="centered"
		[matRippleDisabled]="disabled"
		[matRippleUnbounded]="unbounded"
		[matRippleRadius]="radius"
		[matRippleColor]="color">
	Click me
	</div>


	`,
	styles: `

	.example-ripple-container {
		cursor: pointer;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.05);

		width: 300px;
		height: 300px;
		line-height: 300px;

		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;

		-webkit-user-drag: none;
		-webkit-tap-highlight-color: transparent;
	}

	/** Styles to make the demo look better. */
	.example-ripple-checkbox {
	margin: 6px 12px 6px 0;
	}

	.example-ripple-form-field {
	margin: 0 12px 0 0;
	}


	`,
	standalone: true,
	imports: [MatCheckboxModule, FormsModule, MatFormFieldModule, MatInputModule, MatRippleModule],
})
export class RippleOverviewExample {
	centered = false;
	disabled = false;
	unbounded = false;

	radius!: number;
	color!: string;
}
