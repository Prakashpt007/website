import {Component} from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

/** @title Date range picker comparison ranges */
@Component({
	selector: 'date-range-picker-comparison-example',
	template: `
	<h6>Date range picker comparison ranges</h6>
	<mat-form-field class="example-form-field">
  <mat-label>First campaign</mat-label>
  <mat-date-range-input
    [formGroup]="campaignOne"
    [rangePicker]="campaignOnePicker"
    [comparisonStart]="campaignTwo.value.start"
    [comparisonEnd]="campaignTwo.value.end">
    <input matStartDate placeholder="Start date" formControlName="start">
    <input matEndDate placeholder="End date" formControlName="end">
  </mat-date-range-input>
  <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="campaignOnePicker"></mat-datepicker-toggle>
  <mat-date-range-picker #campaignOnePicker></mat-date-range-picker>
</mat-form-field>

<mat-form-field class="example-form-field">
  <mat-label>Second campaign</mat-label>
  <mat-date-range-input
    [formGroup]="campaignTwo"
    [rangePicker]="campaignTwoPicker"
    [comparisonStart]="campaignOne.value.start"
    [comparisonEnd]="campaignOne.value.end">
    <input matStartDate placeholder="Start date" formControlName="start">
    <input matEndDate placeholder="End date" formControlName="end">
  </mat-date-range-input>
  <mat-datepicker-toggle matIconSuffix [for]="campaignTwoPicker"></mat-datepicker-toggle>
  <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
  <mat-date-range-picker #campaignTwoPicker></mat-date-range-picker>
</mat-form-field>

	`,
	styles: `

	.example-form-field {
  margin: 0 8px 16px 0;
}

	`,
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatDatepickerModule,
		MatNativeDateModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class DateRangePickerComparisonExample {
	campaignOne = new FormGroup({
		start: new FormControl(new Date(year, month, 13)),
		end: new FormControl(new Date(year, month, 16)),
	});
	campaignTwo = new FormGroup({
		start: new FormControl(new Date(year, month, 15)),
		end: new FormControl(new Date(year, month, 19)),
	});
}
