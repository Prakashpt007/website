import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

/**
 * @title Radios with ngModel
 */
@Component({
	selector: 'radio-ng-model-example',
	template: `
	<h6>Radios with ngModel</h6>
	<label id="example-radio-group-label">Pick your favorite season</label>
	<mat-radio-group
	aria-labelledby="example-radio-group-label"
	class="example-radio-group"
	[(ngModel)]="favoriteSeason">
	@for (season of seasons; track season) {
		<mat-radio-button class="example-radio-button" [value]="season">{{season}}</mat-radio-button>
	}
	</mat-radio-group>
	<div>Your favorite season is: {{favoriteSeason}}</div>


	`,
	styles: `

	.example-radio-group {
		display: flex;
		flex-direction: column;
		margin: 15px 0;
		align-items: flex-start;
	}

	.example-radio-button {
		margin: 5px;
	}


	`,
	standalone: true,
	imports: [MatRadioModule, FormsModule],
})
export class RadioNgModelExample {
	favoriteSeason!: string;
	seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
