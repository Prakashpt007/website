import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Tooltip with a custom position
 */
@Component({
	selector: 'tooltip-position-example',
	template: `
	<h6>Tooltip with a custom position</h6>
	<mat-form-field class="example-user-input">
  <mat-label>Tooltip position</mat-label>
  <mat-select [formControl]="position">
    @for (positionOption of positionOptions; track positionOption) {
      <mat-option [value]="positionOption">{{positionOption}}</mat-option>
    }
  </mat-select>
</mat-form-field>

<button mat-raised-button
        matTooltip="Info about the action"
        [matTooltipPosition]="position.value!"
        aria-label="Button that displays a tooltip in various positions">
  Action
</button>

`,
	styles: `

	.example-user-input {
  margin-right: 8px;
}

	`,
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatTooltipModule,
	],
})
export class TooltipPositionExample {
	positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
	position = new FormControl(this.positionOptions[0]);
}
