import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Configurable progress spinner
 */
@Component({
	selector: 'progress-spinner-configurable-example',
	template: `

	<mat-card class="example-card-progess-spinner">
	<mat-card-content>
		<h2 class="example-h2">Progress spinner configuration</h2>

		<section class="example-section-progess-spinner">
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

		<section class="example-section-progess-spinner">
		<label class="example-margin">Mode:</label>
		<mat-radio-group [(ngModel)]="mode">
			<mat-radio-button class="example-margin" value="determinate">
			Determinate
			</mat-radio-button>
			<mat-radio-button class="example-margin" value="indeterminate">
			Indeterminate
			</mat-radio-button>
		</mat-radio-group>
		</section>

		@if (mode === 'determinate') {
		<section class="example-section-progess-spinner">
			<label class="example-margin">Progress:</label>
			<mat-slider class="example-margin">
			<input type="range" [(ngModel)]="value" matSliderThumb>
			</mat-slider>
		</section>
		}
	</mat-card-content>
	</mat-card>

	<mat-card class="example-card-progess-spinner">
	<mat-card-content>
		<h2 class="example-h2">Result</h2>

		<mat-progress-spinner
			class="example-margin"
			[color]="color"
			[mode]="mode"
			[value]="value">
		</mat-progress-spinner>
	</mat-card-content>
	</mat-card>


	`,
	styles: `

	.example-h2 {
	margin: 10px;
	}

	.example-section-progess-spinner {
	display: flex;
	align-content: center;
	align-items: center;
	height: 60px;
	}

	.example-margin {
	margin: 0 10px;
	}

	.example-card-progess-spinner {
	margin-bottom: 10px;
	}


	`,
	standalone: true,
	imports: [MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressSpinnerModule],
})
export class ProgressSpinnerConfigurableExample {
	color: ThemePalette = 'primary';
	mode: ProgressSpinnerMode = 'determinate';
	value = 50;
}
