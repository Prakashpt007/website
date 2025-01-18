import {Component} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

/**
 * @title Basic grid-list
 */
@Component({
	selector: 'grid-list-overview-example',
	styles: `

	mat-grid-tile {
	background: lightblue;
	}


	`,
	template: `
	<h6>Basic grid-list</h6>
	<mat-grid-list cols="2" rowHeight="2:1">
		<mat-grid-tile>1</mat-grid-tile>
		<mat-grid-tile>2</mat-grid-tile>
		<mat-grid-tile>3</mat-grid-tile>
		<mat-grid-tile>4</mat-grid-tile>
	</mat-grid-list>

	`,
	standalone: true,
	imports: [MatGridListModule],
})
export class GridListOverviewExample { }
