import {Component} from '@angular/core';
import {
	MatDialog,
	MatDialogRef,
	MatDialogActions,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Dialog Animations
 */
@Component({
	selector: 'dialog-animations-example',
	styles: `
	button {
  margin-right: 8px;
}

	`,
	template: `
	<h6>Dialog Animations</h6>
	<button mat-raised-button (click)="openDialog('0ms', '0ms')">Open dialog without animation</button>
<button mat-raised-button (click)="openDialog('3000ms', '1500ms')">Open dialog slowly</button>

	`,
	standalone: true,
	imports: [MatButtonModule],
})
export class DialogAnimationsExample {
	constructor (public dialog: MatDialog) { }

	openDialog (enterAnimationDuration: string, exitAnimationDuration: string): void {
		this.dialog.open(DialogAnimationsExampleDialog, {
			width: '250px',
			enterAnimationDuration,
			exitAnimationDuration,
		});
	}
}

@Component({
	selector: 'dialog-animations-example-dialog',
	template: `
	<h1 mat-dialog-title>Delete file</h1>
<div mat-dialog-content>
  Would you like to delete cat.jpeg?
</div>
<div mat-dialog-actions>
  <button mat-button mat-dialog-close>No</button>
  <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
</div>
`,
	standalone: true,
	imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
	constructor (public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}
