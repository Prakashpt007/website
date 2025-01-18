import {Component} from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';

const ELEMENT_DATA = [
	{name: 'Hydrogen'},
	{name: 'Helium'},
	{name: 'Lithium'},
	{name: 'Beryllium'},
	{name: 'Boron'},
	{name: 'Carbon'},
	{name: 'Nitrogen'},
	{name: 'Oxygen'},
	{name: 'Fluorine'},
	{name: 'Neon'},
];

/**
 * @title Tables with Material Design ripples.
 */
@Component({
	selector: 'table-with-ripples-example',
	template: `
	<h6>Tables with Material Design ripples.</h6>
	<mat-table [dataSource]="dataSource" class="mat-elevation-z8">
	<ng-container matColumnDef="name">
		<mat-header-cell mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
		<mat-cell mat-cell *matCellDef="let element"> {{element.name}} </mat-cell>
	</ng-container>

	<mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
	<mat-row matRipple *matRowDef="let row; columns: displayedColumns;"></mat-row>
	</mat-table>


	`,
	standalone: true,
	imports: [MatTableModule, MatRippleModule],
})
export class TableWithRipplesExample {
	displayedColumns: string[] = ['name'];
	dataSource = ELEMENT_DATA;
}
