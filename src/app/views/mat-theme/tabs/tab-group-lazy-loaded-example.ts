
import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Tab group where the tab content is loaded lazily (when activated)
 */
@Component({
	selector: 'tab-group-lazy-loaded-example',
	template: `
	<h6>Tab group where the tab content is loaded lazily (when activated)</h6>

	<mat-tab-group>
	<mat-tab label="First">
		<ng-template matTabContent>
		Content 1 - Loaded: {{getTimeLoaded(1) | date:'medium'}}
		</ng-template>
	</mat-tab>
	<mat-tab label="Second">
		<ng-template matTabContent>
		Content 2 - Loaded: {{getTimeLoaded(2) | date:'medium'}}
		</ng-template>
	</mat-tab>
	<mat-tab label="Third">
		<ng-template matTabContent>
		Content 3 - Loaded: {{getTimeLoaded(3) | date:'medium'}}
		</ng-template>
	</mat-tab>
	</mat-tab-group>

  `,
	standalone: true,
	imports: [MatTabsModule, DatePipe],
})
export class TabGroupLazyLoadedExample {
	tabLoadTimes: Date[] = [];

	getTimeLoaded (index: number) {
		if (!this.tabLoadTimes[index]) {
			this.tabLoadTimes[index] = new Date();
		}

		return this.tabLoadTimes[index];
	}
}




