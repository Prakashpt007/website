import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';

/**
 * @title List with selection
 */
@Component({
	selector: 'list-selection-example',
	template: `
	<h6>List with selection</h6>
	<mat-selection-list #shoes>
	@for (shoe of typesOfShoes; track shoe) {
		<mat-list-option>{{shoe}}</mat-list-option>
	}
	</mat-selection-list>

	<p>
	Options selected: {{shoes.selectedOptions.selected.length}}
	</p>


	`,
	standalone: true,
	imports: [MatListModule],
})
export class ListSelectionExample {
	typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
