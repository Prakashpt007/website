import {Component} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

/**
 * @title Basic slider
 */
@Component({
	selector: 'slider-overview-example',
	template: `
	<h6>Basic slider</h6>
	<mat-slider>
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
export class SliderOverviewExample { }
