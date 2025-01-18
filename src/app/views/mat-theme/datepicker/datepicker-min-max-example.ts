import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

/** @title Datepicker with min & max validation */
@Component({
	selector: 'datepicker-min-max-example',
	template: `
	<h6>Datepicker with min & max validation</h6>
	<mat-form-field class="example-full-width">
  <mat-label>Choose a date</mat-label>
  <input matInput [min]="minDate" [max]="maxDate" [matDatepicker]="picker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
})
export class DatepickerMinMaxExample {
	minDate: Date;
	maxDate: Date;

	constructor () {
		// Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
		const currentYear = new Date().getFullYear();
		this.minDate = new Date(currentYear - 20, 0, 1);
		this.maxDate = new Date(currentYear + 1, 11, 31);
	}
}
