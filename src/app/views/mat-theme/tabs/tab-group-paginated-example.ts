import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Tab group with paginated tabs
 */
@Component({
	selector: 'tab-group-paginated-example',
	template: `
	<h6>Tab group with paginated tabs</h6>
	<mat-tab-group>
	@for (tab of lotsOfTabs; track tab) {
		<mat-tab [label]="tab">Content</mat-tab>
	}
	</mat-tab-group>

`,
	standalone: true,
	imports: [MatTabsModule],
})
export class TabGroupPaginatedExample {
	lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${ index }`);
}
