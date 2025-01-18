import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @title Flex table where one column's cells has a greater height than others.
 */
@Component({
	selector: 'table-flex-large-row-example',
	styles: `

	.mat-mdc-table {
	width: 100%;
	max-height: 500px;
	overflow: auto;
	}

	.mat-column-name {
	height: 100px;
	}


	`,
	template: `
	<h6>Flex table where one column's cells has a greater height than others.</h6>
	<mat-table [dataSource]="dataSource" class="mat-elevation-z8">
	<!-- Position Column -->
	<ng-container matColumnDef="position">
		<mat-header-cell *matHeaderCellDef> No. </mat-header-cell>
		<mat-cell *matCellDef="let element"> {{element.position}} </mat-cell>
	</ng-container>

	<!-- Name Column -->
	<ng-container matColumnDef="name">
		<mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
		<mat-cell *matCellDef="let element"> {{element.name}} </mat-cell>
	</ng-container>

	<!-- Weight Column -->
	<ng-container matColumnDef="weight">
		<mat-header-cell *matHeaderCellDef> Weight </mat-header-cell>
		<mat-cell *matCellDef="let element"> {{element.weight}} </mat-cell>
	</ng-container>

	<!-- Symbol Column -->
	<ng-container matColumnDef="symbol">
		<mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>
		<mat-cell *matCellDef="let element"> {{element.symbol}} </mat-cell>
	</ng-container>

	<mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
	<mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
	</mat-table>

	`,
	standalone: true,
	imports: [MatTableModule],
})
export class TableFlexLargeRowExample {
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	dataSource = ELEMENT_DATA;
}
