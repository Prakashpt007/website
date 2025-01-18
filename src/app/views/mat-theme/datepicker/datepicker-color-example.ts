import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

/** @title Datepicker palette colors */
@Component({
	selector: 'datepicker-color-example',
	template: `
	<h6>Datepicker palette colors</h6>
<mat-form-field color="accent">
  <mat-label>Inherited calendar color</mat-label>
  <input matInput [matDatepicker]="picker1">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker1"></mat-datepicker-toggle>
  <mat-datepicker #picker1></mat-datepicker>
</mat-form-field>

<mat-form-field color="primary">
  <mat-label>Custom calendar color 1</mat-label>
  <input matInput [matDatepicker]="picker3">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker3"></mat-datepicker-toggle>
  <mat-datepicker #picker3 color="primary"></mat-datepicker>
</mat-form-field>

<mat-form-field color="warn">
  <mat-label>Custom calendar color 2</mat-label>
  <input matInput [matDatepicker]="picker2">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker2"></mat-datepicker-toggle>
  <mat-datepicker #picker2 color="warn"></mat-datepicker>
</mat-form-field>

	`,
	styles: `
	mat-form-field {
  margin-right: 12px;
}

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule],
})
export class DatepickerColorExample { }
