import {Component} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';

export interface Transaction {
	item: string;
	cost: number;
}

/**
 * @title Table with a sticky footer
 */
@Component({
	selector: 'table-sticky-footer-example',
	styles: `
	.example-container {
	height: 270px;
	overflow: auto;
	}

	table {
	width: 100%;
	}

	tr.mat-mdc-footer-row {
	font-weight: bold;
	}

	.mat-mdc-table-sticky {
	border-top: 1px solid #e0e0e0;
	}


	`,
	template: `
	<h6>Table with a sticky footer</h6>
	<section class="example-container mat-elevation-z8" tabindex="0">
	<table mat-table [dataSource]="transactions">
		<!-- Item Column -->
		<ng-container matColumnDef="item">
		<th mat-header-cell *matHeaderCellDef> Item </th>
		<td mat-cell *matCellDef="let transaction"> {{transaction.item}} </td>
		<td mat-footer-cell *matFooterCellDef> Total </td>
		</ng-container>

		<!-- Cost Column -->
		<ng-container matColumnDef="cost">
		<th mat-header-cell *matHeaderCellDef> Cost </th>
		<td mat-cell *matCellDef="let transaction"> {{transaction.cost | currency}} </td>
		<td mat-footer-cell *matFooterCellDef> {{getTotalCost() | currency}} </td>
		</ng-container>

		<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
		<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
		<tr mat-footer-row *matFooterRowDef="displayedColumns; sticky: true"></tr>
	</table>
	</section>


	`,
	standalone: true,
	imports: [MatTableModule, CurrencyPipe],
})
export class TableStickyFooterExample {
	displayedColumns = ['item', 'cost'];
	transactions: Transaction[] = [
		{item: 'Beach ball', cost: 4},
		{item: 'Towel', cost: 5},
		{item: 'Frisbee', cost: 2},
		{item: 'Sunscreen', cost: 4},
		{item: 'Cooler', cost: 25},
		{item: 'Swim suit', cost: 15},
	];

	/** Gets the total cost of all transactions. */
	getTotalCost () {
		return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
	}
}
