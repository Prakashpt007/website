import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface User {
	name: string;
}

/**
 * @title Display value autocomplete
 */
@Component({
	selector: 'autocomplete-display-example',
	template: `
	<h6>Display value autocomplete</h6>
	<form class="example-form">
	  <mat-form-field class="example-full-width">
	    <mat-label>Assignee</mat-label>
	    <input type="text" matInput [formControl]="myControl" [matAutocomplete]="auto">
	    <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
	      @for (option of filteredOptions | async; track option) {
	        <mat-option [value]="option">
	          {{option.name}}
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
export class AutocompleteDisplayExample implements OnInit {
	myControl = new FormControl<string | User>('');
	options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
	filteredOptions: Observable<User[]> | undefined;

	ngOnInit () {
		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(''),
			map(value => {
				const name = typeof value === 'string' ? value : value?.name;
				return name ? this._filter(name as string) : this.options.slice();
			}),
		);
	}

	displayFn (user: User): string {
		return user && user.name ? user.name : '';
	}

	private _filter (name: string): User[] {
		const filterValue = name.toLowerCase();

		return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
	}
}
