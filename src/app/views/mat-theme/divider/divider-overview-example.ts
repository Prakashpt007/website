import {Component} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

/**
 * @title Basic divider
 */
@Component({
	selector: 'divider-overview-example',
	template: `
	<h6>Basic divider<h6>
	<mat-list>
  <mat-list-item>Item 1</mat-list-item>
  <mat-divider></mat-divider>
  <mat-list-item>Item 2</mat-list-item>
  <mat-divider></mat-divider>
  <mat-list-item>Item 3</mat-list-item>
</mat-list>

	`,
	standalone: true,
	imports: [MatListModule, MatDividerModule],
})
export class DividerOverviewExample { }
