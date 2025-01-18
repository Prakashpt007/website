import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Stepper with editable steps
 */
@Component({
	selector: 'stepper-editable-example',
	template: `
	<h6>Stepper with editable steps</h6>
	<button mat-raised-button (click)="isEditable = !isEditable">
	{{!isEditable ? 'Enable edit mode' : 'Disable edit mode'}}
	</button>

	<mat-stepper linear #stepper>
	<mat-step [stepControl]="firstFormGroup" [editable]="isEditable">
		<form [formGroup]="firstFormGroup">
		<ng-template matStepLabel>Fill out your name</ng-template>
		<mat-form-field>
			<mat-label>Name</mat-label>
			<input matInput formControlName="firstCtrl" placeholder="Last name, First name" required>
		</mat-form-field>
		<div>
			<button mat-button matStepperNext>Next</button>
		</div>
		</form>
	</mat-step>
	<mat-step [stepControl]="secondFormGroup" [editable]="isEditable">
		<form [formGroup]="secondFormGroup">
		<ng-template matStepLabel>Fill out your address</ng-template>
		<mat-form-field>
			<mat-label>Address</mat-label>
			<input matInput formControlName="secondCtrl" placeholder="Ex. 1 Main St, New York, NY"
				required>
		</mat-form-field>
		<div>
			<button mat-button matStepperPrevious>Back</button>
			<button mat-button matStepperNext>Next</button>
		</div>
		</form>
	</mat-step>
	<mat-step>
		<ng-template matStepLabel>Done</ng-template>
		<p>You are now done.</p>
		<div>
		<button mat-button matStepperPrevious>Back</button>
		<button mat-button (click)="stepper.reset()">Reset</button>
		</div>
	</mat-step>
	</mat-stepper>


	`,
	styles: `

	.mat-stepper-horizontal {
	margin-top: 8px;
	}

	.mat-mdc-form-field {
	margin-top: 16px;
	}


	`,
	standalone: true,
	imports: [
		MatButtonModule,
		MatStepperModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
	],
})
export class StepperEditableExample {
	_formBuilder = inject(FormBuilder);
	firstFormGroup = this._formBuilder.group({
		firstCtrl: ['', Validators.required],
	});
	secondFormGroup = this._formBuilder.group({
		secondCtrl: ['', Validators.required],
	});
	isEditable = false;

	constructor () { }
}
