import {Component} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

/**
 * @title Button toggle selection mode
 */
@Component({
	selector: 'button-toggle-mode-example',
	template: `

<h6>Button toggle selection mode</h6>
<section>
	<h6>Single selection</h6>
<mat-button-toggle-group name="favoriteColor" aria-label="Favorite Color">
  <mat-button-toggle value="red">Red</mat-button-toggle>
  <mat-button-toggle value="green">Green</mat-button-toggle>
  <mat-button-toggle value="blue">Blue</mat-button-toggle>
</mat-button-toggle-group>
</section>
<section>
	<br/>
<h6>Multiple selection</h6>
<mat-button-toggle-group name="ingredients" aria-label="Ingredients" multiple>
  <mat-button-toggle value="flour">Flour</mat-button-toggle>
  <mat-button-toggle value="eggs">Eggs</mat-button-toggle>
  <mat-button-toggle value="sugar">Sugar</mat-button-toggle>
</mat-button-toggle-group>
</section>

	`,
	standalone: true,
	imports: [MatButtonToggleModule],
})
export class ButtonToggleModeExample { }
