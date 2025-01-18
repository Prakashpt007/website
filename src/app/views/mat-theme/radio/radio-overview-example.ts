import {Component} from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

/**
 * @title Basic radios
 */
@Component({
	selector: 'radio-overview-example',
	template: `
	<h6>Basic radios</h6>
	<mat-radio-group aria-label="Select an option">
		<mat-radio-button value="1">Option 1</mat-radio-button>
		<mat-radio-button value="2">Option 2</mat-radio-button>
	</mat-radio-group>


	`,
	styles: `
	.mat-mdc-radio-button ~ .mat-mdc-radio-button {
		margin-left: 16px;
	}
	`,
	standalone: true,
	imports: [MatRadioModule],
})
export class RadioOverviewExample { }
