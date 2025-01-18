import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Filter autocomplete
 */
@Component({
	selector: 'autocomplete-filter-example',
	template: `
	<h6>Filter autocomplete</h6>
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
	        @for (option of filteredOptions | async; track option) {
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
    ReactiveFormsModule,
    AsyncPipe
],
})
export class AutocompleteFilterExample implements OnInit {
	myControl = new FormControl('');
	options: string[] = ['One', 'Two', 'Three'];
	filteredOptions: Observable<string[]> | undefined;

	ngOnInit () {
		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value || '')),
		);
	}

	private _filter (value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.options.filter(option => option.toLowerCase().includes(filterValue));
	}
}
