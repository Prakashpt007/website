import {Component, ViewChild} from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
	selector: 'expansion-expand-collapse-all-example',
	template: `
	<h6>Accordion with expand/collapse all toggles</h6>
	<div class="example-action-buttons">
		<div class="d-flex gap-2">
			<button class="btn btn-primary" (click)="accordion.openAll()">Expand All</button>
			<button class="btn btn-primary" (click)="accordion.closeAll()">Collapse All</button>
		</div>
	</div>
	<div class="p-2">
	<mat-accordion class="example-headers-align" multi>
	<mat-expansion-panel>
		<mat-expansion-panel-header>
		<mat-panel-title>
			Personal data
		</mat-panel-title>
		<mat-panel-description>
			Type your name and age
			<mat-icon>account_circle</mat-icon>
		</mat-panel-description>
		</mat-expansion-panel-header>

		<mat-form-field>
		<mat-label>First name</mat-label>
		<input matInput>
		</mat-form-field>

		<mat-form-field>
		<mat-label>Age</mat-label>
		<input matInput type="number" min="1">
		</mat-form-field>

	</mat-expansion-panel>
	<mat-expansion-panel disabled>
		<mat-expansion-panel-header>
		<mat-panel-title>
			Destination
		</mat-panel-title>
		<mat-panel-description>
			Type the country name
			<mat-icon>map</mat-icon>
		</mat-panel-description>
		</mat-expansion-panel-header>

		<mat-form-field>
		<mat-label>Country</mat-label>
		<input matInput>
		</mat-form-field>
	</mat-expansion-panel>

	<mat-expansion-panel>
		<mat-expansion-panel-header>
		<mat-panel-title>
			Day of the trip
		</mat-panel-title>
		<mat-panel-description>
			Inform the date you wish to travel
			<mat-icon>date_range</mat-icon>
		</mat-panel-description>
		</mat-expansion-panel-header>

		<mat-form-field>
		<mat-label>Date</mat-label>
		<input matInput [matDatepicker]="picker" (focus)="picker.open()" readonly>
		</mat-form-field>
		<mat-datepicker #picker></mat-datepicker>
	</mat-expansion-panel>
	</mat-accordion>
	</div>
	`,
	styles: `

	.example-action-buttons {
  padding-bottom: 20px;
}

.example-headers-align .mat-expansion-panel-header-description {
  justify-content: space-between;
  align-items: center;
}

.example-headers-align .mat-mdc-form-field + .mat-mdc-form-field {
  margin-left: 8px;
}


	`,
	standalone: true,
	providers: [provideNativeDateAdapter()],
	imports: [
		MatButtonModule,
		MatExpansionModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
	],
})
export class ExpansionExpandCollapseAllExample {
	@ViewChild(MatAccordion)
	accordion!: MatAccordion;
}
