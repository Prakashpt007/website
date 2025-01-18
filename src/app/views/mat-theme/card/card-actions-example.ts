import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Card with actions alignment option
 */
@Component({
	selector: 'card-actions-example',
	template: `

	<h6>Card with actions alignment option</h6>
	<mat-card>
  <mat-card-header>
    <mat-card-title>Actions Buttons</mat-card-title>
    <mat-card-subtitle>Start</mat-card-subtitle>
  </mat-card-header>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>
<br>
<mat-card>
  <mat-card-header>
    <mat-card-title>Actions Buttons</mat-card-title>
    <mat-card-subtitle>End</mat-card-subtitle>
  </mat-card-header>
  <mat-card-actions align="end">
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>


	`,
	standalone: true,
	imports: [MatCardModule, MatButtonModule],
})
export class CardActionsExample { }
