import {Component} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
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
 * @title Adding and removing data when using an observable-based datasource.
 */
@Component({
	selector: 'table-dynamic-observable-data-example',
	styles: `
	.demo-table {
	width: 100%;
	}

	.demo-button-container {
	padding-bottom: 16px;
	}

	.demo-button + .demo-button {
	margin-left: 8px;
	}


	`,
	template: `
	<h6>Adding and removing data when using an observable-based datasource.</h6>
	<div class="demo-button-container">
	<button mat-raised-button (click)="addData()" class="demo-button">
		Add data
	</button>
	<button
		mat-raised-button
		[disabled]="!dataToDisplay.length"
		(click)="removeData()"
		class="demo-button">
		Remove data
	</button>
	</div>

	<table mat-table [dataSource]="dataSource" class="mat-elevation-z8 demo-table">
	<!-- Position Column -->
	<ng-container matColumnDef="position">
		<th mat-header-cell *matHeaderCellDef>No.</th>
		<td mat-cell *matCellDef="let element">{{element.position}}</td>
	</ng-container>

	<!-- Name Column -->
	<ng-container matColumnDef="name">
		<th mat-header-cell *matHeaderCellDef>Name</th>
		<td mat-cell *matCellDef="let element">{{element.name}}</td>
	</ng-container>

	<!-- Weight Column -->
	<ng-container matColumnDef="weight">
		<th mat-header-cell *matHeaderCellDef>Weight</th>
		<td mat-cell *matCellDef="let element">{{element.weight}}</td>
	</ng-container>

	<!-- Symbol Column -->
	<ng-container matColumnDef="symbol">
		<th mat-header-cell *matHeaderCellDef>Symbol</th>
		<td mat-cell *matCellDef="let element">{{element.symbol}}</td>
	</ng-container>

	<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
	<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
	</table>


	`,
	standalone: true,
	imports: [MatButtonModule, MatTableModule],
})
export class TableDynamicObservableDataExample {
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	dataToDisplay = [...ELEMENT_DATA];

	dataSource = new ExampleDataSource(this.dataToDisplay);

	addData () {
		const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
		this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
		this.dataSource.setData(this.dataToDisplay);
	}

	removeData () {
		this.dataToDisplay = this.dataToDisplay.slice(0, -1);
		this.dataSource.setData(this.dataToDisplay);
	}
}

class ExampleDataSource extends DataSource<PeriodicElement> {
	private _dataStream = new ReplaySubject<PeriodicElement[]>();

	constructor (initialData: PeriodicElement[]) {
		super();
		this.setData(initialData);
	}

	connect (): Observable<PeriodicElement[]> {
		return this._dataStream;
	}

	disconnect () { }

	setData (data: PeriodicElement[]) {
		this._dataStream.next(data);
	}
}
