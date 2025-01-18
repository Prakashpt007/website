import {Component} from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Basic date range picker */
@Component({
	selector: 'date-range-picker-overview-example',
	template: `
	<h6>Basic date range picker</h6>
	<mat-form-field>
  <mat-label>Enter a date range</mat-label>
  <mat-date-range-input [rangePicker]="picker">
    <input matStartDate placeholder="Start date">
    <input matEndDate placeholder="End date">
  </mat-date-range-input>
  <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-date-range-picker #picker></mat-date-range-picker>
</mat-form-field>

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
})
export class DateRangePickerOverviewExample { }
