import {Component} from '@angular/core';
import {
	MatBottomSheet,
	MatBottomSheetModule,
	MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Bottom Sheet Overview
 */
@Component({
	selector: 'bottom-sheet-overview-example',
	styles: `



::ng-deep .cdk-overlay-container {
	z-index: 10000;

	.mat-mdc-optgroup-label {
		display: block !important;
	}

	.cdk-overlay-dark-backdrop {
		    background: rgba(var(--bs-primary-rgb), 0.15);
		// background-color: var(--bs-body-bg);
		backdrop-filter: blur(0.625rem);
	}
}
	`,
	template: `
	<p>You have received a file called "cat-picture.jpeg".</p>

<button mat-raised-button (click)="openBottomSheet()">Open file</button>

	`,
	standalone: true,
	imports: [MatButtonModule, MatBottomSheetModule],
})
export class BottomSheetOverviewExample {
	constructor (private _bottomSheet: MatBottomSheet) { }

	openBottomSheet (): void {
		this._bottomSheet.open(BottomSheetOverviewExampleSheet);
	}
}

@Component({
	selector: 'bottom-sheet-overview-example-sheet',
	template: `
	<mat-nav-list>
  <a href="https://keep.google.com/" mat-list-item (click)="openLink($event)">
    <span matListItemTitle>Google Keep</span>
    <span matLine>Add to a note</span>
  </a>

  <a href="https://docs.google.com/" mat-list-item (click)="openLink($event)">
    <span matListItemTitle>Google Docs</span>
    <span matLine>Embed in a document</span>
  </a>

  <a href="https://plus.google.com/" mat-list-item (click)="openLink($event)">
    <span matListItemTitle>Google Plus</span>
    <span matLine>Share with your friends</span>
  </a>

  <a href="https://hangouts.google.com/" mat-list-item (click)="openLink($event)">
    <span matListItemTitle>Google Hangouts</span>
    <span matLine>Show to your coworkers</span>
  </a>
</mat-nav-list>

	`,
	standalone: true,
	imports: [MatListModule],
})
export class BottomSheetOverviewExampleSheet {
	constructor (private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) { }

	openLink (event: MouseEvent): void {
		this._bottomSheetRef.dismiss();
		event.preventDefault();
	}
}
