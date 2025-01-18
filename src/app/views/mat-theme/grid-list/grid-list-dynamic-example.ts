import {Component} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

export interface Tile {
	color: string;
	cols: number;
	rows: number;
	text: string;
}

/**
 * @title Dynamic grid-list
 */
@Component({
	selector: 'grid-list-dynamic-example',
	template: `
	<h6>Dynamic grid-list</h6>
	<mat-grid-list cols="4" rowHeight="100px">
		@for (tile of tiles; track tile) {
			<mat-grid-tile
			[colspan]="tile.cols"
			[rowspan]="tile.rows"
			[style.background]="tile.color">{{tile.text}}</mat-grid-tile>
		}
	</mat-grid-list>

	`,
	standalone: true,
	imports: [MatGridListModule],
})
export class GridListDynamicExample {
	tiles: Tile[] = [
		{text: 'One', cols: 3, rows: 1, color: 'lightblue'},
		{text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
		{text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
		{text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
	];
}
