import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Configurable slide-toggle
 */
@Component({
	selector: 'slide-toggle-configurable-example',
	template: `
	<h6>Configurable slide-toggle</h6>
	<mat-card>
	<mat-card-content>
		<h6 class="example-h6">Slider configuration</h6>

		<section class="example-section-slide-toggle">
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

		<section class="example-section-slide-toggle">
		<mat-checkbox class="example-margin" [(ngModel)]="checked">Checked</mat-checkbox>
		</section>

		<section class="example-section-slide-toggle">
		<mat-checkbox class="example-margin" [(ngModel)]="disabled">Disabled</mat-checkbox>
		</section>
	</mat-card-content>
	</mat-card>

	<mat-card class="result mt-3">
	<mat-card-content>
		<h6 class="example-h6">Result</h6>

		<section class="example-section-slide-toggle">
		<mat-slide-toggle
			class="example-margin"
			[color]="color"
			[checked]="checked"
			[disabled]="disabled">
			Slide me!
		</mat-slide-toggle>
		</section>
	</mat-card-content>
	</mat-card>


	`,
	styles: `

	.example-h2 {
	margin: 10px;
	}

	.example-section-slide-toggle {
	display: flex;
	align-content: center;
	align-items: center;
	height: 60px;
	}

	.example-margin {
	margin: 10px;
	}


	`,
	standalone: true,
	imports: [MatCardModule, MatRadioModule, FormsModule, MatCheckboxModule, MatSlideToggleModule],
})
export class SlideToggleConfigurableExample {
	color: ThemePalette = 'accent';
	checked = false;
	disabled = false;
}
