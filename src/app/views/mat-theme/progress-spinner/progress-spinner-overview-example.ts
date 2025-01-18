import {Component} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

/**
 * @title Basic progress-spinner
 */
@Component({
	selector: 'progress-spinner-overview-example',
	template: `
	<h6>Basic progress-spinner</h6>
	<mat-spinner></mat-spinner>
	`,
	standalone: true,
	imports: [MatProgressSpinnerModule],
})
export class ProgressSpinnerOverviewExample { }
