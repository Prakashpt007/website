import {Component, Inject} from '@angular/core';
import {
	MatDialog,
	MAT_DIALOG_DATA,
	MatDialogTitle,
	MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

export interface DialogData {
	animal: 'panda' | 'unicorn' | 'lion';
}

/**
 * @title Injecting data when opening a dialog
 */
@Component({
	selector: 'dialog-data-example',
	template: `
	<h6>Injecting data when opening a dialog</h6>
	<button mat-button (click)="openDialog()">Open dialog</button>


	`,
	standalone: true,
	imports: [MatButtonModule],
})
export class DialogDataExample {
	constructor (public dialog: MatDialog) { }

	openDialog () {
		this.dialog.open(DialogDataExampleDialog, {
			data: {
				animal: 'panda',
			},
		});
	}
}

@Component({
	selector: 'dialog-data-example-dialog',
	template: `
	<h2 mat-dialog-title>Favorite Animal</h2>
<mat-dialog-content>
  My favorite animal is:
  <ul>
    <li>
      @if (data.animal === 'panda') {
        <span>&#10003;</span>
      } Panda
    </li>
    <li>
      @if (data.animal === 'unicorn') {
        <span>&#10003;</span>
      } Unicorn
    </li>
    <li>
      @if (data.animal === 'lion') {
        <span>&#10003;</span>
      } Lion
    </li>
  </ul>
</mat-dialog-content>


	`,
	standalone: true,
	imports: [MatDialogTitle, MatDialogContent],
})
export class DialogDataExampleDialog {
	constructor (@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
