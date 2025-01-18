import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Tab group with stretched labels
 */
@Component({
	selector: 'tab-group-stretched-example',
	template: `
	<h6>Tab group with stretched labels</h6>
	<mat-tab-group mat-stretch-tabs class="example-stretched-tabs mat-elevation-z4">
	<mat-tab label="First"> Content 1 </mat-tab>
	<mat-tab label="Second"> Content 2 </mat-tab>
	<mat-tab label="Third"> Content 3 </mat-tab>
	</mat-tab-group>


	`,
	styles: `

	.example-stretched-tabs {
	max-width: 800px;
	}
	`,
	standalone: true,
	imports: [MatTabsModule],
})
export class TabGroupStretchedExample { }
