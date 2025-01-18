import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

/**
 * @title Table showing each row context properties.
 */
@Component({
	selector: 'table-row-context-example',
	styles: `
	table {
	width: 100%;
	}

	`,
	template: `
	<h6>Table showing each row context properties.</h6>
	<table mat-table [dataSource]="data" class="mat-elevation-z8">
	<!-- Implicit Column -->
	<ng-container matColumnDef="$implicit">
		<th mat-header-cell *matHeaderCellDef> $implicit </th>
		<td mat-cell *matCellDef="let data"> {{data}} </td>
	</ng-container>

	<!-- Index Column -->
	<ng-container matColumnDef="index">
		<th mat-header-cell *matHeaderCellDef> index </th>
		<td mat-cell *matCellDef="let index = index"> {{index}} </td>
	</ng-container>

	<!-- Count Column -->
	<ng-container matColumnDef="count">
		<th mat-header-cell *matHeaderCellDef> count </th>
		<td mat-cell *matCellDef="let count = count"> {{count}} </td>
	</ng-container>

	<!-- First Column -->
	<ng-container matColumnDef="first">
		<th mat-header-cell *matHeaderCellDef> first </th>
		<td mat-cell *matCellDef="let first = first"> {{first}} </td>
	</ng-container>

	<!-- Last Column -->
	<ng-container matColumnDef="last">
		<th mat-header-cell *matHeaderCellDef> last </th>
		<td mat-cell *matCellDef="let last = last"> {{last}} </td>
	</ng-container>

	<!-- Even Column -->
	<ng-container matColumnDef="even">
		<th mat-header-cell *matHeaderCellDef> even </th>
		<td mat-cell *matCellDef="let even = even"> {{even}} </td>
	</ng-container>

	<!-- Odd Column -->
	<ng-container matColumnDef="odd">
		<th mat-header-cell *matHeaderCellDef> odd </th>
		<td mat-cell *matCellDef="let odd = odd"> {{odd}} </td>
	</ng-container>

	<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
	<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
	</table>


	`,
	standalone: true,
	imports: [MatTableModule],
})
export class TableRowContextExample {
	displayedColumns: string[] = ['$implicit', 'index', 'count', 'first', 'last', 'even', 'odd'];
	data: string[] = ['one', 'two', 'three', 'four', 'five'];
}
