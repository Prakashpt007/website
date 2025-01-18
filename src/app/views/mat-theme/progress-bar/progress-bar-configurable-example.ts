import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Configurable progress-bar
 */
@Component({
	selector: 'progress-bar-configurable-example',
	template: `
	<h6>Configurable progress-bar</h6>
	<mat-card class="mb-3">
	<mat-card-content>
		<h2 class="example-h2">Progress bar configuration</h2>

		<section class="example-section-progess">
		<label class="example-margin">Color:</label>
		<mat-radio-group [(ngModel)]="color">
			<mat-radio-button class="example-margin" value="primary">
			Primary
			</mat-radio-button>
			<mat-radio-button class="example-margin" value="accent">
			Accent
			</mat-radio-button>
			<mat-radio-button class="example-margin" value="warn">
			Warn
			</mat-radio-button>
		</mat-radio-group>
		</section>

		<section class="example-section-progess">
		<label class="example-margin">Mode:</label>
		<mat-radio-group [(ngModel)]="mode">
			<mat-radio-button class="example-margin" value="determinate">
			Determinate
			</mat-radio-button>
			<mat-radio-button class="example-margin" value="indeterminate">
			Indeterminate
			</mat-radio-button>
			<mat-radio-button class="example-margin" value="buffer">
			Buffer
			</mat-radio-button>
			<mat-radio-button class="example-margin" value="query">
			Query
			</mat-radio-button>
		</mat-radio-group>
		</section>

		@if (mode === 'determinate' || mode === 'buffer') {
		<section class="example-section-progess">
			<label class="example-margin">Progress:</label>
			<mat-slider class="example-margin">
			<input type="range" [(ngModel)]="value" matSliderThumb>
			</mat-slider>
		</section>
		}
		@if (mode === 'buffer') {
		<section class="example-section-progess">
			<label class="example-margin">Buffer:</label>
			<mat-slider class="example-margin">
			<input type="range" [(ngModel)]="bufferValue" matSliderThumb>
			</mat-slider>
		</section>
		}
	</mat-card-content>
	</mat-card>

	<mat-card class="example-card">
	<mat-card-content>
		<h2 class="example-h2">Result</h2>

		<section class="example-section-progess">
		<mat-progress-bar
			class="example-margin"
			[color]="color"
			[mode]="mode"
			[value]="value"
			[bufferValue]="bufferValue">
		</mat-progress-bar>
		</section>
	</mat-card-content>
	</mat-card>


	`,
	styles: `

	.example-h2 {
	margin: 10px;
	}

	.example-section-progess {
	display: flex;
	align-content: center;
	align-items: center;
	height: 60px;
	}

	.example-margin {
	margin: 0 10px;
	}

	.example-card {
	margin-bottom: 10px;
	}


	`,
	standalone: true,
	imports: [MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressBarModule],
})
export class ProgressBarConfigurableExample {
	color: ThemePalette = 'primary';
	mode: ProgressBarMode = 'determinate';
	value = 50;
	bufferValue = 75;
}
