import {Component} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

/**
 * @title Slider with custom thumb label formatting.
 */
@Component({
	selector: 'slider-formatting-example',
	template: `
	<h6>Slider with custom thumb label formatting.</h6>
	<mat-slider min="0" max="100000" step="1000" showTickMarks discrete [displayWith]="formatLabel">
		<input matSliderThumb>
	</mat-slider>
	`,
	styles: `
	mat-slider {
	width: 300px;
	}

	`,
	standalone: true,
	imports: [MatSliderModule],
})
export class SliderFormattingExample {
	formatLabel (value: number): string {
		if (value >= 1000) {
			return Math.round(value / 1000) + 'k';
		}

		return `${ value }`;
	}
}
