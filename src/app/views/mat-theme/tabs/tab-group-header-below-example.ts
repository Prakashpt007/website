import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Tab group with the headers on the bottom
 */
@Component({
	selector: 'tab-group-header-below-example',
	template: `
	<h6>Tab group with the headers on the bottom</h6>
	<mat-tab-group headerPosition="below">
	<mat-tab label="First"> Content 1 </mat-tab>
	<mat-tab label="Second"> Content 2 </mat-tab>
	<mat-tab label="Third"> Content 3 </mat-tab>
	</mat-tab-group>

	`,
	standalone: true,
	imports: [MatTabsModule],
})
export class TabGroupHeaderBelowExample { }
