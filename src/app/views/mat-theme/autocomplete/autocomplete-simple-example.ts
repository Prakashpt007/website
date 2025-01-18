import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Simple autocomplete
 */
@Component({
	selector: 'autocomplete-simple-example',
	template: `

<h6>Simple autocomplete</h6>
<form class="example-form">
  <mat-form-field class="example-full-width">
    <mat-label>Number</mat-label>
    <input type="text"
      placeholder="Pick one"
      aria-label="Number"
      matInput
      [formControl]="myControl"
      [matAutocomplete]="auto">
      <mat-autocomplete #auto="matAutocomplete">
        @for (option of options; track option) {
          <mat-option [value]="option">
            {{option}}
          </mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  </form>

`,
	styles: `
	.example-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}

.example-full-width {
  width: 100%;
}

	`,
	standalone: true,
	imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
],
})
export class AutocompleteSimpleExample {
	myControl = new FormControl('');
	options: string[] = ['One', 'Two', 'Three'];
}
