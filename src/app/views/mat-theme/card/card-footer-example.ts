import {Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Card with footer
 */
@Component({
	selector: 'card-footer-example',
	template: `

<h6>Card with footer</h6>
	<mat-card class="example-card">
  <mat-card-header>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
    <mat-card-title>Shiba Inu</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>This card has divider and indeterminate progress as footer</p>
    <p>{{ longText }}</p>
    <mat-divider></mat-divider>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
  <mat-card-footer>
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  </mat-card-footer>
</mat-card>


	`,
	styles: `
	.example-card {
  max-width: 400px;
}



	`,
	standalone: true,
	imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
})
export class CardFooterExample {
	longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}
