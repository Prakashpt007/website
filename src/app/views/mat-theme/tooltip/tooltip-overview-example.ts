import {Component} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Basic tooltip
 */
@Component({
	selector: 'tooltip-overview-example',
	template: `
	<h6>Basic tooltip</h6>
	<button mat-raised-button
			matTooltip="Info about the action"
			aria-label="Button that displays a tooltip when focused or hovered over">
	Action
	</button>

	`,
	standalone: true,
	imports: [MatButtonModule, MatTooltipModule],
})
export class TooltipOverviewExample { }
