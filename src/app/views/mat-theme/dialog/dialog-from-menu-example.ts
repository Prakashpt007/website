import {Component, ViewChild} from '@angular/core';
import {
	MatDialog,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
} from '@angular/material/dialog';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
/**
 * @title Dialog launched from a menu
 */
@Component({
	selector: 'dialog-from-menu-example',
	template: `
	<h6>Dialog launched from a menu</h6>
	<button mat-button [matMenuTriggerFor]="menu" #menuTrigger>Menu</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item (click)="openDialog()">Open dialog</button>
</mat-menu>


	`,
	standalone: true,
	imports: [MatButtonModule, MatMenuModule],
})
export class DialogFromMenuExample {
	@ViewChild('menuTrigger')
	menuTrigger!: MatMenuTrigger;

	constructor (public dialog: MatDialog) { }

	openDialog () {
		const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, {restoreFocus: false});

		// Manually restore focus to the menu trigger since the element that
		// opens the dialog won't be in the DOM any more when the dialog closes.
		dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
	}
}

@Component({
	selector: 'dialog-from-menu-dialog',
	template: `
	<mat-dialog-content>
  This is a dialog
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close>Okay</button>
</mat-dialog-actions>


	`,
	standalone: true,
	imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogFromMenuExampleDialog { }
