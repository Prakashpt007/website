import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Basic tooltip
 */
@Component({
	selector: 'tooltip-position-at-origin-example',
	template: `
	<h6>Basic tooltip</h6>
	<button mat-raised-button
			class="demo-button"
			matTooltip="Info about the action"
			[matTooltipPositionAtOrigin]="enabled.value"
			aria-label="Button that displays a tooltip when focused or hovered over">
	Action
	</button>

	<mat-checkbox [formControl]="enabled" class="example-enabled-checkbox">
	Position at origin enabled
	</mat-checkbox>

	`,
	styles: `
	button.demo-button {
	width: 500px;
	height: 500px;
	}

	.example-enabled-checkbox {
	margin-left: 8px;
	}

	`,
	standalone: true,
	imports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
})
export class TooltipPositionAtOriginExample {
	enabled = new FormControl(false);
}
