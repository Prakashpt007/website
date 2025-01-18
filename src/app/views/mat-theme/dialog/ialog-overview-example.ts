import {Component, Inject} from '@angular/core';
import {
	MatDialog,
	MAT_DIALOG_DATA,
	MatDialogRef,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface DialogData {
	animal: string;
	name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
	selector: 'dialog-overview-example',
	template: `
	<h6>Dialog Overview</h6>
	<ol>
  <li>
    <mat-form-field>
      <mat-label>What's your name?</mat-label>
      <input matInput [(ngModel)]="name">
    </mat-form-field>
  </li>
  <li>
    <button mat-raised-button (click)="openDialog()">Pick one</button>
  </li>
  @if (animal) {
    <li>You chose: <em>{{animal}}</em></li>
  }
</ol>


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogOverviewExample {
	animal!: string;
	name!: string;

	constructor (public dialog: MatDialog) { }

	openDialog (): void {
		const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
			data: {name: this.name, animal: this.animal},
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.animal = result;
		});
	}
}

@Component({
	selector: 'dialog-overview-example-dialog',
	template: `
	<h2 mat-dialog-title>Hi {{data.name}}</h2>
<mat-dialog-content>
  <p>What's your favorite animal?</p>
  <mat-form-field>
    <mat-label>Favorite Animal</mat-label>
    <input matInput [(ngModel)]="data.animal">
  </mat-form-field>
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
</mat-dialog-actions>


	`,
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
	],
})
export class DialogOverviewExampleDialog {
	constructor (
		public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
	) { }

	onNoClick (): void {
		this.dialogRef.close();
	}
}
