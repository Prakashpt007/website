import {Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

/**
 * @title Determinate progress-bar
 */
@Component({
	selector: 'progress-bar-determinate-example',
	template: `
	<h6>Determinate progress-bar</h6>
	<mat-progress-bar mode="determinate" value="40"></mat-progress-bar>
	`,
	standalone: true,
	imports: [MatProgressBarModule],
})
export class ProgressBarDeterminateExample { }
