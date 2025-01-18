import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Basic use of the tab group
 */
@Component({
	selector: 'tab-group-basic-example',
	template: `
	<h6>Basic use of the tab group</h6>
	<mat-tab-group>
	<mat-tab label="First"> Content 1 </mat-tab>
	<mat-tab label="Second"> Content 2 </mat-tab>
	<mat-tab label="Third"> Content 3 </mat-tab>
	</mat-tab-group>


	`,
	standalone: true,
	imports: [MatTabsModule],
})
export class TabGroupBasicExample { }
