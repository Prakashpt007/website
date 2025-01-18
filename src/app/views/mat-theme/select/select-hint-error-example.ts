import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Animal {
	name: string;
	sound: string;
}

/** @title Select with form field features */
@Component({
	selector: 'select-hint-error-example',
	template: `
	<h6>Select with form field features</h6>
	<h6>mat select</h6>
	<mat-form-field>
	<mat-label>Favorite animal</mat-label>
	<mat-select [formControl]="animalControl" required>
		<mat-option>--</mat-option>
		@for (animal of animals; track animal) {
		<mat-option [value]="animal">{{animal.name}}</mat-option>
		}
	</mat-select>
	@if (animalControl.hasError('required')) {
		<mat-error>Please choose an animal</mat-error>
	}
	<mat-hint>{{animalControl.value?.sound}}</mat-hint>
	</mat-form-field>

	<h6 class="mt-3">native html select</h6>
	<mat-form-field>
	<mat-label>Select your car (required)</mat-label>
	<select matNativeControl required [formControl]="selectFormControl">
		<option label="--select something --"></option>
		<option value="saab">Saab</option>
		<option value="mercedes">Mercedes</option>
		<option value="audi">Audi</option>
	</select>
	@if (selectFormControl.hasError('required')) {
		<mat-error>This field is required</mat-error>
	}
	<mat-hint>You can pick up your favorite car here</mat-hint>
	</mat-form-field>


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
})
export class SelectHintErrorExample {
	animalControl = new FormControl<Animal | null>(null, Validators.required);
	selectFormControl = new FormControl('', Validators.required);
	animals: Animal[] = [
		{name: 'Dog', sound: 'Woof!'},
		{name: 'Cat', sound: 'Meow!'},
		{name: 'Cow', sound: 'Moo!'},
		{name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
	];
}
