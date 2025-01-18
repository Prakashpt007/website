import {Component, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

/** @title Datepicker with custom date classes */
@Component({
	selector: 'datepicker-date-class-example',
	template: `
	<h6>Datepicker with custom date classes</h6>
	<mat-form-field class="example-full-width">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker [dateClass]="dateClass" #picker></mat-datepicker>
</mat-form-field>


	`,
	styles: `

	button.example-custom-date-class {
  background: orange;
  border-radius: 100%;
}

	`,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule],
})
export class DatepickerDateClassExample {
	dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
		// Only highligh dates inside the month view.
		if (view === 'month') {
			const date = cellDate.getDate();

			// Highlight the 1st and 20th day of each month.
			return date === 1 || date === 20 ? 'example-custom-date-class' : '';
		}

		return '';
	};
}
