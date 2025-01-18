import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Tab group animations
 */
@Component({
	selector: 'tab-group-animations-example',
	template: `
	<h6>Tab group animations</h6>
	<h6>No animation</h6>

	<mat-tab-group animationDuration="0ms">
	<mat-tab label="First">Content 1</mat-tab>
	<mat-tab label="Second">Content 2</mat-tab>
	<mat-tab label="Third">Content 3</mat-tab>
	</mat-tab-group>

	<h6>Very slow animation</h6>
	<mat-tab-group animationDuration="2000ms">
	<mat-tab label="First">Content 1</mat-tab>
	<mat-tab label="Second">Content 2</mat-tab>
	<mat-tab label="Third">Content 3</mat-tab>
	</mat-tab-group>

	`,
	styles: `

	.mat-tab-group {
	margin-bottom: 48px;
	}

	`,
	standalone: true,
	imports: [MatTabsModule],
})
export class TabGroupAnimationsExample { }
