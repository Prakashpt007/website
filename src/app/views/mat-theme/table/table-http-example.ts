import { HttpClient } from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
	selector: 'table-http-example',
	styles: `
	/* Structure */
	.example-container {
	position: relative;
	}

	.example-table-container {
	position: relative;
	min-height: 200px;
	max-height: 400px;
	overflow: auto;
	}

	table {
	width: 100%;
	}

	.example-loading-shade {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 56px;
	right: 0;
	background: rgba(0, 0, 0, 0.15);
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	}

	.example-rate-limit-reached {
	max-width: 360px;
	text-align: center;
	}

	/* Column Widths */
	.mat-column-number,
	.mat-column-state {
	max-width: 64px;
	}

	.mat-column-created {
	max-width: 124px;
	}


	`,
	template: `
	<h6>Table retrieving data through HTTP</h6>
	<div class="example-container mat-elevation-z8">
	@if (isLoadingResults || isRateLimitReached) {
		<div class="example-loading-shade">
		@if (isLoadingResults) {
			<mat-spinner></mat-spinner>
		}
		@if (isRateLimitReached) {
			<div class="example-rate-limit-reached">
			GitHub's API rate limit has been reached. It will be reset in one minute.
			</div>
		}
		</div>
	}

	<div class="example-table-container">

		<table mat-table [dataSource]="data" class="example-table"
			matSort matSortActive="created" matSortDisableClear matSortDirection="desc">
		<!-- Number Column -->
		<ng-container matColumnDef="number">
			<th mat-header-cell *matHeaderCellDef>#</th>
			<td mat-cell *matCellDef="let row">{{row.number}}</td>
		</ng-container>

		<!-- Title Column -->
		<ng-container matColumnDef="title">
			<th mat-header-cell *matHeaderCellDef>Title</th>
			<td mat-cell *matCellDef="let row">{{row.title}}</td>
		</ng-container>

		<!-- State Column -->
		<ng-container matColumnDef="state">
			<th mat-header-cell *matHeaderCellDef>State</th>
			<td mat-cell *matCellDef="let row">{{row.state}}</td>
		</ng-container>

		<!-- Created Column -->
		<ng-container matColumnDef="created">
			<th mat-header-cell *matHeaderCellDef mat-sort-header disableClear>
			Created
			</th>
			<td mat-cell *matCellDef="let row">{{row.created_at | date}}</td>
		</ng-container>

		<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
		<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
		</table>
	</div>

	<mat-paginator [length]="resultsLength" [pageSize]="30" aria-label="Select page of GitHub search results"></mat-paginator>
	</div>


	`,
	standalone: true,
	imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe],
})
export class TableHttpExample implements AfterViewInit {
	displayedColumns: string[] = ['created', 'state', 'number', 'title'];
	exampleDatabase!: ExampleHttpDatabase | null;
	data: GithubIssue[] = [];

	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor (private _httpClient: HttpClient) { }

	ngAfterViewInit () {
		this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					return this.exampleDatabase!.getRepoIssues(
						this.sort.active,
						this.sort.direction,
						this.paginator.pageIndex,
					).pipe(catchError(() => observableOf(null)));
				}),
				map(data => {
					// Flip flag to show that loading has finished.
					this.isLoadingResults = false;
					this.isRateLimitReached = data === null;

					if (data === null) {
						return [];
					}

					// Only refresh the result length if there is new data. In case of rate
					// limit errors, we do not want to reset the paginator to zero, as that
					// would prevent users from re-triggering requests.
					this.resultsLength = data.total_count;
					return data.items;
				}),
			)
			.subscribe(data => (this.data = data));
	}
}

export interface GithubApi {
	items: GithubIssue[];
	total_count: number;
}

export interface GithubIssue {
	created_at: string;
	number: string;
	state: string;
	title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
	constructor (private _httpClient: HttpClient) { }

	getRepoIssues (sort: string, order: SortDirection, page: number): Observable<GithubApi> {
		const href = 'https://api.github.com/search/issues';
		const requestUrl = `${ href }?q=repo:angular/components&sort=${ sort }&order=${ order }&page=${ page + 1
			}`;

		return this._httpClient.get<GithubApi>(requestUrl);
	}
}
