import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

/**
 * @title Table with sticky columns
 */
@Component({
	selector: 'table-sticky-columns-example',
	styles: `
	.example-container {
	height: 400px;
	width: 550px;
	max-width: 100%;
	overflow: auto;
	}

	table {
	width: 800px;
	}

	td.mat-column-star {
	width: 20px;
	padding-right: 8px;
	}

	th.mat-column-position, td.mat-column-position {
	padding-left: 8px;
	}

	.mat-mdc-table-sticky-border-elem-right {
	border-left: 1px solid #e0e0e0;
	}

	.mat-mdc-table-sticky-border-elem-left {
	border-right: 1px solid #e0e0e0;
	}


	`,
	template: `
	<h6>Table with sticky columns</h6>
	<section class="example-container mat-elevation-z8" tabindex="0">
	<table mat-table [dataSource]="dataSource">

		<!-- Name Column -->
		<ng-container matColumnDef="name" sticky>
		<th mat-header-cell *matHeaderCellDef> Name </th>
		<td mat-cell *matCellDef="let element"> {{element.name}} </td>
		</ng-container>

		<!-- Position Column -->
		<ng-container matColumnDef="position">
		<th mat-header-cell *matHeaderCellDef> No. </th>
		<td mat-cell *matCellDef="let element"> {{element.position}} </td>
		</ng-container>

		<!-- Weight Column -->
		<ng-container matColumnDef="weight">
		<th mat-header-cell *matHeaderCellDef> Weight </th>
		<td mat-cell *matCellDef="let element"> {{element.weight}} </td>
		</ng-container>

		<!-- Symbol Column -->
		<ng-container matColumnDef="symbol">
		<th mat-header-cell *matHeaderCellDef> Symbol </th>
		<td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
		</ng-container>

		<!-- Star Column -->
		<ng-container matColumnDef="star" stickyEnd>
		<th mat-header-cell *matHeaderCellDef aria-label="row actions">&nbsp;</th>
		<td mat-cell *matCellDef="let element">
			<mat-icon>more_vert</mat-icon>
		</td>
		</ng-container>

		<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
		<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
	</table>
	</section>

	`,
	standalone: true,
	imports: [MatTableModule, MatIconModule],
})
export class TableStickyColumnsExample {
	displayedColumns = [
		'name',
		'position',
		'weight',
		'symbol',
		'position',
		'weight',
		'symbol',
		'star',
	];
	dataSource = ELEMENT_DATA;
}

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
