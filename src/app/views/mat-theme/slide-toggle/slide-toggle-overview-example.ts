import {Component} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

/**
 * @title Basic slide-toggles
 */
@Component({
	selector: 'slide-toggle-overview-example',
	template: `
	<p><mat-slide-toggle>Slide me!</mat-slide-toggle></p>
	<p><mat-slide-toggle labelPosition="before">...and slide me too!</mat-slide-toggle></p>
	`,
	standalone: true,
	imports: [MatSlideToggleModule],
})
export class SlideToggleOverviewExample { }
