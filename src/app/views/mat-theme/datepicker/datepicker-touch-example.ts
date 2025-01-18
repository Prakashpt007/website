import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

/** @title Datepicker touch UI */
@Component({
	selector: 'datepicker-touch-example',
	template: `
	<h6>Datepicker touch UI</h6>
	<mat-form-field class="example-full-width">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker touchUi #picker></mat-datepicker>
</mat-form-field>


	`,
	styles: `
	::ng-deep .cdk-overlay-container {
	z-index: 10000;

	.mat-mdc-optgroup-label {
		display: block !important;
	}

	.cdk-overlay-dark-backdrop {
		    background: rgba(var(--bs-primary-rgb), 0.15);
		// background-color: var(--bs-body-bg);
		backdrop-filter: blur(0.625rem);
	}
}
	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
})
export class DatepickerTouchExample { }
