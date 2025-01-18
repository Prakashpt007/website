import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Using tabs with a custom label template
 */
@Component({
	selector: 'tab-group-custom-label-example',
	template: `
	<h6>Using tabs with a custom label template</h6>
	<mat-tab-group>
	<mat-tab>
		<ng-template mat-tab-label>
		<mat-icon class="example-tab-icon">thumb_up</mat-icon>
		First
		</ng-template>
		Content 1
	</mat-tab>

	<mat-tab>
		<ng-template mat-tab-label>
		<mat-icon class="example-tab-icon">thumb_up</mat-icon>
		Second
		</ng-template>
		Content 2
	</mat-tab>

	<mat-tab>
		<ng-template mat-tab-label>
		<mat-icon class="example-tab-icon">thumb_up</mat-icon>
		Third
		</ng-template>

		Content 3
	</mat-tab>
	</mat-tab-group>


	`,
	styles: `
	.example-tab-icon {
	margin-right: 8px;
	}

	`,
	standalone: true,
	imports: [MatTabsModule, MatIconModule],
})
export class TabGroupCustomLabelExample { }
