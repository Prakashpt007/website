import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

/** @title Form field with label */
@Component({
	selector: 'form-field-label-example',
	template: `
	<h6>Form field with label</h6>
	<div class="example-container">
	<form [formGroup]="options">
		<mat-checkbox [formControl]="hideRequiredControl">Hide required marker</mat-checkbox>
		<div>
		<label>Float label: </label>
		<mat-radio-group [formControl]="floatLabelControl">
			<mat-radio-button value="auto">Auto</mat-radio-button>
			<mat-radio-button value="always">Always</mat-radio-button>
		</mat-radio-group>
		</div>

		<div class="example-form-fields">
		<mat-form-field
			[hideRequiredMarker]="hideRequiredControl.value"
			[floatLabel]="getFloatLabelValue()">
			<input matInput placeholder="Simple placeholder" required>
		</mat-form-field>

		<mat-form-field [floatLabel]="getFloatLabelValue()">
			<mat-label>Both a label and a placeholder</mat-label>
			<input matInput placeholder="Simple placeholder">
		</mat-form-field>

		<mat-form-field
			[hideRequiredMarker]="hideRequiredControl.value"
			[floatLabel]="getFloatLabelValue()">
			<mat-select required>
			<mat-option>-- None --</mat-option>
			<mat-option value="option">Option</mat-option>
			</mat-select>
			<mat-label><mat-icon>favorite</mat-icon> <strong> Fancy</strong> <em> label</em></mat-label>
		</mat-form-field>
		</div>
	</form>
	</div>


	`,
	styles: `

	.example-container mat-form-field + mat-form-field {
	margin-left: 8px;
	}

	.example-container mat-form-field {
	width: 220px;
	}

	.example-container form {
	margin-bottom: 20px;
	}

	.example-container form > * {
	margin: 12px 0;
	}

	.example-container .mat-radio-button {
	margin: 0 12px;
	}

	.example-form-fields {
	display: flex;
	align-items: flex-start;
	}


	`,
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatRadioModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatIconModule,
	],
})
export class FormFieldLabelExample {
	_formBuilder = inject(FormBuilder);
	hideRequiredControl = new FormControl(false);
	floatLabelControl = new FormControl('auto' as FloatLabelType);
	options = this._formBuilder.group({
		hideRequired: this.hideRequiredControl,
		floatLabel: this.floatLabelControl,
	});

	constructor () { }

	getFloatLabelValue (): FloatLabelType {
		return this.floatLabelControl.value || 'auto';
	}
}
