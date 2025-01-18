import {Component} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

/**
 * @title Basic chips
 */
@Component({
	selector: 'chips-overview-example',
	template: `
	<h6>Basic chips</h6>
	<mat-chip-listbox aria-label="Fish selection">
  <mat-chip-option>One fish</mat-chip-option>
  <mat-chip-option>Two fish</mat-chip-option>
  <mat-chip-option color="accent" selected>Accent fish</mat-chip-option>
  <mat-chip-option color="warn">Warn fish</mat-chip-option>
</mat-chip-listbox>
	`,
	standalone: true,
	imports: [MatChipsModule],
})
export class ChipsOverviewExample { }
