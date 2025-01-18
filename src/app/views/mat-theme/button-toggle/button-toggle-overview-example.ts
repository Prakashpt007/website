import {Component} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

/**
 * @title Basic button-toggles
 */
@Component({
	selector: 'button-toggle-overview-example',
	template: `
<h6>Basic button-toggles</h6>
	<mat-button-toggle-group name="fontStyle" aria-label="Font Style">
  <mat-button-toggle value="bold">Bold</mat-button-toggle>
  <mat-button-toggle value="italic">Italic</mat-button-toggle>
  <mat-button-toggle value="underline">Underline</mat-button-toggle>
</mat-button-toggle-group>

	`,
	standalone: true,
	imports: [MatButtonToggleModule],
})
export class ButtonToggleOverviewExample { }
