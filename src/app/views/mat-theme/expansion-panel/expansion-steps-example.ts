import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {provideNativeDateAdapter} from '@angular/material/core';

/**
 * @title Expansion panel as accordion
 */
@Component({
	selector: 'expansion-steps-example',
	template: `
	<h6>Expansion panel as accordion</h6>
	<mat-accordion class="example-headers-align">
		<mat-expansion-panel [expanded]="step === 0" (opened)="setStep(0)" hideToggle>
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
			<mat-action-row>
			<button mat-raised-button color="primary" (click)="nextStep()">Next</button>
			</mat-action-row>
		</mat-expansion-panel>

		<mat-expansion-panel [expanded]="step === 1" (opened)="setStep(1)" hideToggle>
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

			<mat-action-row>
			<button mat-raised-button color="warn" (click)="prevStep()">Previous</button>
			<button mat-raised-button color="primary" (click)="nextStep()">Next</button>
			</mat-action-row>
		</mat-expansion-panel>

		<mat-expansion-panel [expanded]="step === 2" (opened)="setStep(2)" hideToggle>
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

			<mat-action-row>
			<button mat-raised-button color="warn" (click)="prevStep()">Previous</button>
			<button mat-raised-button color="primary" (click)="nextStep()">End</button>
			</mat-action-row>
		</mat-expansion-panel>

	</mat-accordion>


	`,
	styles: `

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
		MatExpansionModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDatepickerModule,
	],
})
export class ExpansionStepsExample {
	step = 0;

	setStep (index: number) {
		this.step = index;
	}

	nextStep () {
		this.step++;
	}

	prevStep () {
		this.step--;
	}
}
