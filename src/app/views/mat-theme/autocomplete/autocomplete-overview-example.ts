import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AsyncPipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface State {
	flag: string;
	name: string;
	population: string;
}

/**
 * @title Autocomplete overview
 */
@Component({
	selector: 'autocomplete-overview-example',
	template: `
	<h6>Autocomplete overview</h6>
	<form class="example-form">
	  <mat-form-field class="example-full-width">
	    <mat-label>State</mat-label>
	    <input matInput
	      aria-label="State"
	      [matAutocomplete]="auto"
	      [formControl]="stateCtrl">
	      <mat-autocomplete #auto="matAutocomplete">
	        @for (state of filteredStates | async; track state) {
	          <mat-option [value]="state.name">
	            <img alt="" class="example-option-img" [src]="state.flag" height="25">
	            <span>{{state.name}}</span> |
	            <small>Population: {{state.population}}</small>
	          </mat-option>
	        }
	      </mat-autocomplete>
	    </mat-form-field>
	
	    <br>
	
	      <mat-slide-toggle
	        [checked]="stateCtrl.disabled"
	        (change)="stateCtrl.disabled ? stateCtrl.enable() : stateCtrl.disable()">
	        Disable Input?
	      </mat-slide-toggle>
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

.example-option-img {
  vertical-align: middle;
  margin-right: 8px;
}

[dir='rtl'] .example-option-img {
  margin-right: 0;
  margin-left: 8px;
}
	`,
	standalone: true,
	imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe
],
})
export class AutocompleteOverviewExample {
	stateCtrl = new FormControl('');
	filteredStates: Observable<State[]>;

	states: State[] = [
		{
			name: 'Arkansas',
			population: '2.978M',
			// https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
			flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
		},
		{
			name: 'California',
			population: '39.14M',
			// https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
			flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
		},
		{
			name: 'Florida',
			population: '20.27M',
			// https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
			flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
		},
		{
			name: 'Texas',
			population: '27.47M',
			// https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
			flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
		},
	];

	constructor () {
		this.filteredStates = this.stateCtrl.valueChanges.pipe(
			startWith(''),
			map(state => (state ? this._filterStates(state) : this.states.slice())),
		);
	}

	private _filterStates (value: string): State[] {
		const filterValue = value.toLowerCase();

		return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
	}
}
