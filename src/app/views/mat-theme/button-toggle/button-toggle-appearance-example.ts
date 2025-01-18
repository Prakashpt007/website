import {Component} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

/**
 * @title Button toggle appearance
 */
@Component({
	selector: 'button-toggle-appearance-example',
	template: `

	<h6>Button toggle appearance</h6>
	<p>
  Default appearance:
  <mat-button-toggle-group name="fontStyle" aria-label="Font Style">
    <mat-button-toggle value="bold">Bold</mat-button-toggle>
    <mat-button-toggle value="italic">Italic</mat-button-toggle>
    <mat-button-toggle value="underline">Underline</mat-button-toggle>
  </mat-button-toggle-group>
</p>

<p>
  Legacy appearance:
  <mat-button-toggle-group appearance="legacy" name="fontStyle" aria-label="Font Style">
    <mat-button-toggle value="bold">Bold</mat-button-toggle>
    <mat-button-toggle value="italic">Italic</mat-button-toggle>
    <mat-button-toggle value="underline">Underline</mat-button-toggle>
  </mat-button-toggle-group>
</p>

	`,
	styles: `
	mat-button-toggle-group {
  margin-left: 12px;
}

	`,
	standalone: true,
	imports: [MatButtonToggleModule],
})
export class ButtonToggleAppearanceExample { }
