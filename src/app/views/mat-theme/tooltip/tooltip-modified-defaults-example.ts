import {Component} from '@angular/core';
import {
	MAT_TOOLTIP_DEFAULT_OPTIONS,
	MatTooltipDefaultOptions,
	MatTooltipModule,
} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
	showDelay: 1000,
	hideDelay: 1000,
	touchendHideDelay: 1000,
};

/**
 * @title Tooltip with a show and hide delay
 */
@Component({
	selector: 'tooltip-modified-defaults-example',
	template: `
	<h6>Tooltip with a show and hide delay</h6>
	<button mat-raised-button
			matTooltip="By default, I delay"
			aria-label="Button that displays a tooltip that has custom delays through a default config">
	Button with delay-default tooltip
	</button>

	`,
	providers: [{provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}],
	standalone: true,
	imports: [MatButtonModule, MatTooltipModule],
})
export class TooltipModifiedDefaultsExample { }
