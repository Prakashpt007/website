import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

/** @title Checkboxes with reactive forms */
@Component({
	selector: 'checkbox-reactive-forms-example',
	template: `
	<h6>Checkboxes with reactive forms</h6>
	<section class="example-section" [formGroup]="toppings">
  <h4>Select your toppings:</h4>
  <p><mat-checkbox formControlName="pepperoni">Pepperoni</mat-checkbox></p>
  <p><mat-checkbox formControlName="extracheese">Extra Cheese</mat-checkbox></p>
  <p><mat-checkbox formControlName="mushroom">Mushroom</mat-checkbox></p>
</section>

<section class="example-section" [formGroup]="toppings">
  <h4>You chose:</h4>

  <pre>
  {{toppings.value | json}}
</pre>
</section>


	`,
	styles: `
	.example-section {
  margin: 12px 0;
}

	`,
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe],
})
export class CheckboxReactiveFormsExample {
	_formBuilder = inject(FormBuilder);
	toppings = this._formBuilder.group({
		pepperoni: false,
		extracheese: false,
		mushroom: false,
	});

	constructor () { }
}
