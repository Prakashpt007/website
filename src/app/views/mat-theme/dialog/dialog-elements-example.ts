import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
	MatDialog,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from '@angular/material/dialog';

/**
 * @title Dialog elements
 */
@Component({
	selector: 'dialog-elements-example',
	template: `
	<h6>Dialog elements</h6>
	<button mat-button (click)="openDialog()">Launch dialog</button>

	`,
	standalone: true,
	imports: [MatButtonModule],
})
export class DialogElementsExample {
	constructor (public dialog: MatDialog) { }

	openDialog () {
		this.dialog.open(DialogElementsExampleDialog);
	}
}

@Component({
	selector: 'dialog-elements-example-dialog',
	template: `
	<h2 mat-dialog-title>Dialog with elements</h2>
<mat-dialog-content>This dialog showcases the title, close, content and actions elements.</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close>Close</button>
</mat-dialog-actions>

	`,
	standalone: true,
	imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogElementsExampleDialog { }
