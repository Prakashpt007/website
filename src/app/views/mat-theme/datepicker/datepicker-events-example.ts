import {Component} from '@angular/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

/** @title Datepicker input and change events */
@Component({
	selector: 'datepicker-events-example',
	template: `
	<h6>Datepicker input and change events</h6>
	<mat-form-field>
	  <mat-label>Input & change events</mat-label>
	  <input matInput [matDatepicker]="picker"
	    (dateInput)="addEvent('input', $event)" (dateChange)="addEvent('change', $event)">
	    <mat-hint>MM/DD/YYYY</mat-hint>
	    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
	    <mat-datepicker #picker></mat-datepicker>
	  </mat-form-field>
	
	  <div class="example-events">
	    @for (e of events; track e) {
	      <div>{{e}}</div>
	    }
	  </div>
	
	
	`,
	styles: `
	.example-events {
  height: 200px;
  border: 1px solid #555;
  overflow: auto;
}


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule],
})
export class DatepickerEventsExample {
	events: string[] = [];

	addEvent (type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${ type }: ${ event.value }`);
	}
}
