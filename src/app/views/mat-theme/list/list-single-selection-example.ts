import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';

/**
 * @title List with single selection
 */
@Component({
	selector: 'list-single-selection-example',
	template: `
	<h6>List with single selection</h6>
	<mat-selection-list #shoes [multiple]="false">
	@for (shoe of typesOfShoes; track shoe) {
		<mat-list-option [value]="shoe">{{shoe}}</mat-list-option>
	}
	</mat-selection-list>

	<p>
	Option selected: {{shoes.selectedOptions.hasValue() ? shoes.selectedOptions.selected[0].value : 'None'}}
	</p>


	`,
	standalone: true,
	imports: [MatListModule],
})
export class ListSingleSelectionExample {
	typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
