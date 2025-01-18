import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Tab group with ink bar fit to content
 */
@Component({
	selector: 'tab-group-ink-bar-example',
	template: `
	<h6>Tab group with ink bar fit to content</h6>
	<mat-tab-group fitInkBarToContent>
	<mat-tab label="First">Content 1</mat-tab>
	<mat-tab label="Second">Content 2</mat-tab>
	<mat-tab label="Third">Content 3</mat-tab>
	<mat-tab label="Fourth" disabled>Content 4</mat-tab>
	</mat-tab-group>

	`,
	standalone: true,
	imports: [MatTabsModule],
})
export class TabGroupInkBarExample { }
