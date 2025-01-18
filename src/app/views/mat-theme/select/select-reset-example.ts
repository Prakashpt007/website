import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Select with reset option */
@Component({
	selector: 'select-reset-example',
	template: `
	<h6>Select with reset option</h6>
	<h6>mat-select</h6>
	<mat-form-field>
	<mat-label>State</mat-label>
	<mat-select>
		<mat-option>None</mat-option>
		@for (state of states; track state) {
		<mat-option [value]="state">{{state}}</mat-option>
		}
	</mat-select>
	</mat-form-field>

	<h6>native html select</h6>
	<mat-form-field>
	<mat-label>Select your car</mat-label>
	<select matNativeControl id="mySelectId">
		<option value="" disabled selected></option>
		<option value="volvo">Volvo</option>
		<option value="saab">Saab</option>
		<option value="mercedes">Mercedes</option>
		<option value="audi">Audi</option>
	</select>
	</mat-form-field>

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
})
export class SelectResetExample {
	states: string[] = [
		'Alabama',
		'Alaska',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Florida',
		'Georgia',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming',
	];
}
