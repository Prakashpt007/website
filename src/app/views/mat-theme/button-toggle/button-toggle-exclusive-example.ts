import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

/**
 * @title Exclusive selection
 */
@Component({
	selector: 'button-toggle-exclusive-example',
	template: `

	<h6>Exclusive selection</h6>
	<mat-button-toggle-group #group="matButtonToggleGroup">
  <mat-button-toggle value="left" aria-label="Text align left">
    <mat-icon>format_align_left</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="center" aria-label="Text align center">
    <mat-icon>format_align_center</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="right" aria-label="Text align right">
    <mat-icon>format_align_right</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="justify" disabled aria-label="Text align justify">
    <mat-icon>format_align_justify</mat-icon>
  </mat-button-toggle>
</mat-button-toggle-group>
<div class="example-selected-value">Selected value: {{group.value}}</div>

	`,
	styles: `
	.example-selected-value {
  margin: 15px 0;
}

	`,
	standalone: true,
	imports: [MatButtonToggleModule, MatIconModule],
})
export class ButtonToggleExclusiveExample { }
