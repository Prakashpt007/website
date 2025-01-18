import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

/** @title Datepicker action buttons */
@Component({
	selector: 'datepicker-actions-example',
	template: `
	<h6>Datepicker action buttons</h6>
	<mat-form-field class="example-form-field">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="datepicker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="datepicker"></mat-datepicker-toggle>
  <mat-datepicker #datepicker>
    <mat-datepicker-actions>
      <button mat-button matDatepickerCancel>Cancel</button>
      <button mat-raised-button color="primary" matDatepickerApply>Apply</button>
    </mat-datepicker-actions>
  </mat-datepicker>
</mat-form-field>

<mat-form-field class="example-form-field">
  <mat-label>Enter a date range</mat-label>
  <mat-date-range-input [rangePicker]="rangePicker">
    <input matStartDate placeholder="Start date">
    <input matEndDate placeholder="End date">
  </mat-date-range-input>
  <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="rangePicker"></mat-datepicker-toggle>
  <mat-date-range-picker #rangePicker>
    <mat-date-range-picker-actions>
      <button mat-button matDateRangePickerCancel>Cancel</button>
      <button mat-raised-button color="primary" matDateRangePickerApply>Apply</button>
    </mat-date-range-picker-actions>
  </mat-date-range-picker>
</mat-form-field>


	`,
	styles: `

	.example-form-field {
  margin-right: 20px;
}

	`,
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
	],
})
export class DatepickerActionsExample { }
