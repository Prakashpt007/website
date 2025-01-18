import {DataSource} from '@angular/cdk/collections';
import {
	AfterContentInit,
	Component,
	ContentChildren,
	Input,
	AfterViewInit,
	QueryList,
	ViewChild,
	ContentChild,
	forwardRef,
} from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {
	MatColumnDef,
	MatHeaderRowDef,
	MatNoDataRow,
	MatRowDef,
	MatTable,
	MatTableDataSource,
	MatTableModule,
} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

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
 * @title Table example that shows how to wrap a table component for definition and behavior reuse.
 */
@Component({
	selector: 'table-wrapped-example',
	styles: `

	table {
	width: 100%;
	}

	button {
	margin: 0 8px 8px 0;
	}


	`,
	template: `
	<h6>Table example that shows how to wrap a table component for definition and behavior reuse.</h6>
	<div>
	<button mat-raised-button (click)="clearTable()">Clear table</button>
	<button mat-raised-button (click)="addData()">Add data</button>
	</div>

	<wrapper-table [dataSource]="dataSource" [columns]="displayedColumns"
				matSort #sort="matSort">
	<!-- Custom column definition to be provided to the wrapper table. -->
	<ng-container matColumnDef="name">
		<th mat-header-cell *matHeaderCellDef> Name </th>
		<td mat-cell *matCellDef="let element"> {{element.name}} </td>
	</ng-container>

	<!-- Custom row definitions to be provided to the wrapper table. -->
	<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
	<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

	<!-- Row shown when there is no matching data that will be provided to the wrapper table. -->
	<tr class="mat-row" *matNoDataRow>
		<td class="mat-cell" colspan="4">No data</td>
	</tr>
	</wrapper-table>


	`,
	standalone: true,
	imports: [MatButtonModule, forwardRef(() => WrapperTable), MatSortModule, MatTableModule],
})
export class TableWrappedExample implements AfterViewInit {
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

	@ViewChild('sort') sort!: MatSort;

	ngAfterViewInit () {
		this.dataSource.sort = this.sort;
	}

	clearTable () {
		this.dataSource.data = [];
	}

	addData () {
		this.dataSource.data = ELEMENT_DATA;
	}
}

/**
 * Table component that accepts column and row definitions in its content to be registered to the
 * table.
 */
@Component({
	selector: 'wrapper-table',
	template: `

	<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
	<ng-content></ng-content>

	<!-- Position Column -->
	<ng-container matColumnDef="position">
		<th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>
		<td mat-cell *matCellDef="let element"> {{element.position}} </td>
	</ng-container>

	<!-- Weight Column -->
	<ng-container matColumnDef="weight">
		<th mat-header-cell *matHeaderCellDef mat-sort-header> Weight </th>
		<td mat-cell *matCellDef="let element"> {{element.weight}} </td>
	</ng-container>

	<!-- Color Column -->
	<ng-container matColumnDef="symbol">
		<th mat-header-cell *matHeaderCellDef> Symbol </th>
		<td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
	</ng-container>
	</table>


	`,
	styles: `
    table {
      width: 100%;
    }
  `,
	standalone: true,
	imports: [MatTableModule, MatSortModule],
})
export class WrapperTable<T> implements AfterContentInit {
	@ContentChildren(MatHeaderRowDef) headerRowDefs!: QueryList<MatHeaderRowDef>;
	@ContentChildren(MatRowDef) rowDefs!: QueryList<MatRowDef<T>>;
	@ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
	@ContentChild(MatNoDataRow) noDataRow!: MatNoDataRow;

	@ViewChild(MatTable, {static: true}) table!: MatTable<T>;

	@Input() columns!: string[];

	@Input() dataSource!: DataSource<T>;

	ngAfterContentInit () {
		this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
		this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
		this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
		this.table.setNoDataRow(this.noDataRow);
	}
}
