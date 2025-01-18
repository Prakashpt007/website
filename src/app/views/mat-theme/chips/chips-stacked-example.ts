import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

import {MatChipsModule} from '@angular/material/chips';

export interface ChipColor {
	name: string;
	color: ThemePalette;
}

/**
 * @title Stacked chips
 */
@Component({
	selector: 'chips-stacked-example',
	template: `
	<h6>Stacked chips</h6>
	<mat-chip-listbox class="mat-mdc-chip-set-stacked" aria-label="Color selection">
	  @for (chip of availableColors; track chip) {
	    <mat-chip-option selected [color]="chip.color">
	      {{chip.name}}
	    </mat-chip-option>
	  }
	</mat-chip-listbox>
	
	`,
	styles: `

	.mat-mdc-chip-set {
  max-width: 200px;
}

	`,
	standalone: true,
	imports: [MatChipsModule],
})
export class ChipsStackedExample {
	availableColors: ChipColor[] = [
		{name: 'none', color: undefined},
		{name: 'Primary', color: 'primary'},
		{name: 'Accent', color: 'accent'},
		{name: 'Warn', color: 'warn'},
	];
}
