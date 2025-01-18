import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Card with sub-title
 */
@Component({
	selector: 'card-subtitle-example',
	template: `

<h6>Card with sub-title</h6>
	<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Shiba Inu</mat-card-title>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <p>This card indeterminates progress bar.</p>
    <p>{{longText}}</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>


	`,
	styles: `

	.example-card {
  max-width: 400px;
}
	`,
	standalone: true,
	imports: [MatCardModule, MatButtonModule],
})
export class CardSubtitleExample {
	longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}
