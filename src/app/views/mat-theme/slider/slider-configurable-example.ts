import {Component} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Configurable slider
 */
@Component({
	selector: 'slider-configurable-example',
	template: `
	<h6>Configurable slider</h6>
	<mat-card>
	<mat-card-content>
		<h6 class="example-h6">Slider configuration</h6>

		<section class="example-section-slider">
		<mat-form-field class="example-margin example-width">
			<mat-label>Value</mat-label>
			<input matInput type="number" [(ngModel)]="value">
		</mat-form-field>
		<mat-form-field class="example-margin example-width">
			<mat-label>Min value</mat-label>
			<input matInput type="number" [(ngModel)]="min">
		</mat-form-field>
		<mat-form-field class="example-margin example-width">
			<mat-label>Max value</mat-label>
			<input matInput type="number" [(ngModel)]="max">
		</mat-form-field>
		<mat-form-field class="example-margin example-width">
			<mat-label>Step size</mat-label>
			<input matInput type="number" [(ngModel)]="step">
		</mat-form-field>
		</section>

		<section class="example-section-slider">
		<mat-checkbox [(ngModel)]="showTicks">Show ticks</mat-checkbox>
		</section>

		<section class="example-section-slider">
		<mat-checkbox [(ngModel)]="thumbLabel">Show thumb label</mat-checkbox>
		</section>

		<section class="example-section-slider">
		<mat-checkbox [(ngModel)]="disabled">Disabled</mat-checkbox>
		</section>
	</mat-card-content>
	</mat-card>

	<mat-card class="example-result-card mt-3">
	<mat-card-content>
		<h6>Result</h6>

		<div class="example-label-container">
		<label id="example-name-label" class="example-name-label">Value</label>
		<label class="example-value-label">{{slider.value}}</label>
		</div>
		<mat-slider
			class="example-margin"
			[disabled]="disabled"
			[max]="max"
			[min]="min"
			[step]="step"
			[discrete]="thumbLabel"
			[showTickMarks]="showTicks">
		<input matSliderThumb [(ngModel)]="value" #slider>
		</mat-slider>
	</mat-card-content>
	</mat-card>


	`,
	styles: `

	.example-h2 {
	margin-left: 10px;
	margin-right: 10px;
	}

	.example-section-slider {
	display: flex;
	flex-wrap: wrap;
	align-content: center;
	align-items: center;
	}

	.example-margin {
	margin: 8px;
	}

	.example-width {
	max-width: 180px;
	width: 100%;
	}

	.mat-mdc-slider {
	max-width: 300px;
	width: 100%;
	}

	.mat-mdc-card + .mat-mdc-card {
	margin-top: 8px;
	}

	.example-result-card h2 {
	margin: 0 8px;
	}

	.example-label-container {
	display: flex;
	justify-content: space-between;
	margin: 20px 10px 0;
	max-width: 284px;
	}

	.example-result-card .example-value-label {
	font-weight: 600;
	}

	`,
	standalone: true,
	imports: [
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatCheckboxModule,
		MatSliderModule,
	],
})
export class SliderConfigurableExample {
	disabled = false;
	max = 100;
	min = 0;
	showTicks = false;
	step = 1;
	thumbLabel = false;
	value = 0;
}
