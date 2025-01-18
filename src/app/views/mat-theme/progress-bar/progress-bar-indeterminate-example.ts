import {Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

/**
 * @title Indeterminate progress-bar
 */
@Component({
	selector: 'progress-bar-indeterminate-example',
	template: `
	<h6>Indeterminate progress-bar</h6>
	<mat-progress-bar mode="indeterminate"></mat-progress-bar>

	`,
	standalone: true,
	imports: [MatProgressBarModule],
})
export class ProgressBarIndeterminateExample { }
