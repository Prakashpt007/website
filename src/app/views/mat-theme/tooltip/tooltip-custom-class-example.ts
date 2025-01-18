import {Component, ViewEncapsulation} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Tooltip that can have a custom class applied.
 */
@Component({
	selector: 'tooltip-custom-class-example',
	template: `
	<h6>Tooltip that can have a custom class applied.</h6>
	<button mat-raised-button
			matTooltip="Info about the action"
			matTooltipClass="example-tooltip-uppercase"
			aria-label="Button that shows a red tooltip"
			class="example-button">
	Uppercase-tooltip Action
	</button>

	`,
	styles: `

	.example-button {
	margin-top: 16px;
	}

	.example-tooltip-uppercase {
	text-transform: uppercase;
	}

	`,
	// Need to remove view encapsulation so that the custom tooltip style defined in
	// `tooltip-custom-class-example.css` will not be scoped to this component's view.
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [MatButtonModule, MatTooltipModule],
})
export class TooltipCustomClassExample { }
