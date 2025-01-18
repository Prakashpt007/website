import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Basic cards
 */
@Component({
	selector: 'card-overview-example',
	template: `
<h6>Basic cards</h6>
	<mat-card>
  <mat-card-content>Simple card</mat-card-content>
</mat-card>


	`,
	standalone: true,
	imports: [MatCardModule],
})
export class CardOverviewExample { }
