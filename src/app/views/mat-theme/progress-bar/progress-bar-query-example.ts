import {Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

/**
 * @title Query progress-bar
 */
@Component({
	selector: 'progress-bar-query-example',
	template: `
	<h6>Query progress-bar</h6>
<mat-progress-bar mode="query"></mat-progress-bar>

	`,
	standalone: true,
	imports: [MatProgressBarModule],
})
export class ProgressBarQueryExample { }
