import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Tooltip that demonstrates auto-hiding when it clips out of its scrolling container.
 */
@Component({
	selector: 'tooltip-auto-hide-example',
	template: `
	<h6>Tooltip that demonstrates auto-hiding when it clips out of its scrolling container.</h6>
	<mat-form-field class="mb-4">
	<mat-label>Tooltip position</mat-label>
	<mat-select [formControl]="position">
		@for (positionOption of positionOptions; track positionOption) {
		<mat-option [value]="positionOption">{{positionOption}}</mat-option>
		}
	</mat-select>
	</mat-form-field>

	<div class="example-container" cdkScrollable>
	<button mat-raised-button #tooltip="matTooltip"
			matTooltip="Info about the action"
			[matTooltipPosition]="position.value!"
			matTooltipHideDelay="100000"
			aria-label="Button that displays a tooltip that hides when scrolled out of the container"
			class="example-button">
		Action
	</button>
	</div>

	`,
	styles: `

	.example-button {
	display: block;
	margin: 80px auto 400px;
	}

	.example-container {
	height: 200px;
	overflow: auto;
	border: 1px solid #ccc;
	}

	`,
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		CdkScrollable,
		MatButtonModule,
		MatTooltipModule,
	],
})
export class TooltipAutoHideExample {
	positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
	position = new FormControl(this.positionOptions[0]);
}
