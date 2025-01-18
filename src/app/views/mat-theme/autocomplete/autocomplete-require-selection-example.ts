import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Require an autocomplete option to be selected
 */
@Component({
	selector: 'autocomplete-require-selection-example',
	template: `

<h6>Require an autocomplete option to be selected</h6>
Control value: {{myControl.value || 'empty'}}

<form class="example-form">
  <mat-form-field class="example-full-width">
    <mat-label>Number</mat-label>
    <input #input
      type="text"
      placeholder="Pick one"
      matInput
      [formControl]="myControl"
      [matAutocomplete]="auto"
      (input)="filter()"
      (focus)="filter()">
      <mat-autocomplete requireSelection #auto="matAutocomplete">
        @for (option of filteredOptions; track option) {
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
  margin-top: 16px;
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
		ReactiveFormsModule,
	],
})
export class AutocompleteRequireSelectionExample {
	@ViewChild('input')
	input!: ElementRef<HTMLInputElement>;
	myControl = new FormControl('');
	options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
	filteredOptions: string[];

	constructor () {
		this.filteredOptions = this.options.slice();
	}

	filter (): void {
		const filterValue = this.input.nativeElement.value.toLowerCase();
		this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
	}
}
