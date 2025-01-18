import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

/** @title Datepicker inline calendar example */
@Component({
	selector: 'datepicker-inline-calendar-example',
	template: `
	<h6>Datepicker inline calendar example</h6>
	<mat-card class="demo-inline-calendar-card">
  <mat-calendar [(selected)]="selected"></mat-calendar>
</mat-card>
<p>Selected date: {{selected}}</p>


	`,
	styles: `
	.demo-inline-calendar-card {
  width: 300px;
}


	`,
	standalone: true,
	imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule],
})
export class DatepickerInlineCalendarExample {
	selected!: Date | null;
}
