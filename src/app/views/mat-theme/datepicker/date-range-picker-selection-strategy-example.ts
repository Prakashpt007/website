import {Component, Injectable} from '@angular/core';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {
	MatDateRangeSelectionStrategy,
	DateRange,
	MAT_DATE_RANGE_SELECTION_STRATEGY,
	MatDatepickerModule,
} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
	constructor (private _dateAdapter: DateAdapter<D>) { }

	selectionFinished (date: D | null): DateRange<D> {
		return this._createFiveDayRange(date);
	}

	createPreview (activeDate: D | null): DateRange<D> {
		return this._createFiveDayRange(activeDate);
	}

	private _createFiveDayRange (date: D | null): DateRange<D> {
		if (date) {
			const start = this._dateAdapter.addCalendarDays(date, -2);
			const end = this._dateAdapter.addCalendarDays(date, 2);
			return new DateRange<D>(start, end);
		}

		return new DateRange<D>(null, null);
	}
}

/** @title Date range picker with custom a selection strategy */
@Component({
	selector: 'date-range-picker-selection-strategy-example',
	template: `
	<h6>Date range picker with custom a selection strategy</h6>
	<mat-form-field>
  <mat-label>Enter a date range</mat-label>
  <mat-date-range-input [rangePicker]="picker">
    <input matStartDate placeholder="Start date">
    <input matEndDate placeholder="End date">
  </mat-date-range-input>
  <mat-hint>MM/DD/YYYY - MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-date-range-picker #picker></mat-date-range-picker>
</mat-form-field>


	`,
	providers: [
		{
			provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
			useClass: FiveDayRangeSelectionStrategy,
		},
	],
	standalone: true,
	imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
})
export class DateRangePickerSelectionStrategyExample { }
