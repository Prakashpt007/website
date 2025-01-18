import {Component} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Tooltip that can be manually shown/hidden.
 */
@Component({
	selector: 'tooltip-manual-example',
	template: `
	<h6>Tooltip that can be manually shown/hidden.</h6>
	<div>
	<span> Click the following buttons to... </span>
	<button mat-button
			(click)="tooltip.show()"
			aria-label="Show tooltip on the button at the end of this section"
			class="example-action-button">
		show
	</button>
	<button mat-button
			(click)="tooltip.hide()"
			aria-label="Hide tooltip on the button at the end of this section"
			class="example-action-button">
		hide
	</button>
	<button mat-button
			(click)="tooltip.toggle()"
			aria-label="Show/Hide tooltip on the button at the end of this section"
			class="example-action-button">
		toggle show/hide
	</button>
	</div>

	<button mat-raised-button #tooltip="matTooltip"
			matTooltip="Info about the action"
			matTooltipPosition="right"
			aria-tooltip="Button that displays and hides a tooltip triggered by other buttons">
	Action
	</button>
	`,
	styles: `
	.example-action-button {
	margin-top: 16px;
	}

	`,
	standalone: true,
	imports: [MatButtonModule, MatTooltipModule],
})
export class TooltipManualExample { }
