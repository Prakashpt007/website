import {Component} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

/**
 * @title Range slider
 */
@Component({
	selector: 'slider-range-example',
	template: `
	<h6>Range slider</h6>
	<mat-slider min="200" max="500">
		<input value="300" matSliderStartThumb>
		<input value="400" matSliderEndThumb>
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
export class SliderRangeExample { }
