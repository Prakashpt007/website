import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';

/**
 * @title Basic list
 */
@Component({
	selector: 'list-overview-example',
	template: `
	<h6>Basic list</h6>
	<mat-list role="list">
		<mat-list-item role="listitem">Item 1</mat-list-item>
		<mat-list-item role="listitem">Item 2</mat-list-item>
		<mat-list-item role="listitem">Item 3</mat-list-item>
	</mat-list>
	`,
	standalone: true,
	imports: [MatListModule],
})
export class ListOverviewExample { }
