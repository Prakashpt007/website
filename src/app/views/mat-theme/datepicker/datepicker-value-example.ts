import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

/** @title Datepicker selected value */
@Component({
	selector: 'datepicker-value-example',
	template: `
	<mat-form-field>
  <mat-label>Angular forms</mat-label>
  <input matInput [matDatepicker]="picker1" [formControl]="date">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker1"></mat-datepicker-toggle>
  <mat-datepicker #picker1></mat-datepicker>
</mat-form-field>

<mat-form-field>
  <mat-label>Angular forms (w/ deserialization)</mat-label>
  <input matInput [matDatepicker]="picker2"
         [formControl]="serializedDate">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker2"></mat-datepicker-toggle>
  <mat-datepicker #picker2></mat-datepicker>
</mat-form-field>

<mat-form-field>
  <mat-label>Value binding</mat-label>
  <input matInput [matDatepicker]="picker3" [value]="date.value">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker3"></mat-datepicker-toggle>
  <mat-datepicker #picker3></mat-datepicker>
</mat-form-field>

	`,
	styles: `
	mat-form-field {
  margin-right: 12px;
}

	`,
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class DatepickerValueExample {
	date = new FormControl(new Date());
	serializedDate = new FormControl(new Date().toISOString());
}
