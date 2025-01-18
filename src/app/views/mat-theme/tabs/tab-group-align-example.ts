import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Tab group with aligned labels
 */
@Component({
	selector: 'tab-group-align-example',
	template: `
	<h6>Tab group with aligned labels</h6>
	<mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start">
	<mat-tab label="First">Content 1</mat-tab>
	<mat-tab label="Second">Content 2</mat-tab>
	<mat-tab label="Third">Content 3</mat-tab>
	</mat-tab-group>

	<mat-tab-group mat-stretch-tabs="false" mat-align-tabs="center">
	<mat-tab label="First">Content 1</mat-tab>
	<mat-tab label="Second">Content 2</mat-tab>
	<mat-tab label="Third">Content 3</mat-tab>
	</mat-tab-group>

	<mat-tab-group mat-stretch-tabs="false" mat-align-tabs="end">
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
export class TabGroupAlignExample { }
