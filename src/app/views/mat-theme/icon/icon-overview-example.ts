import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

/**
 * @title Basic icons
 */
@Component({
	selector: 'icon-overview-example',
	template: `
	<h6>Basic icons</h6>
	<mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>


	`,
	standalone: true,
	imports: [MatIconModule],
})
export class IconOverviewExample { }
