import {Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

/**
 * @title Buffer progress-bar
 */
@Component({
	selector: 'progress-bar-buffer-example',
	template: `
	<h6>Buffer progress-bar</h6>
	<mat-progress-bar mode="buffer"></mat-progress-bar>
	`,
	standalone: true,
	imports: [MatProgressBarModule],
})
export class ProgressBarBufferExample { }
