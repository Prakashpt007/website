import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';

/**
 * @title Stepper label bottom position
 */
@Component({
	selector: 'stepper-label-position-bottom-example',
	template: `
	<h6>Stepper label bottom position</h6>
	<mat-stepper labelPosition="bottom" #stepper>
	<mat-step [stepControl]="firstFormGroup">
		<form [formGroup]="firstFormGroup">
		<ng-template matStepLabel>Fill out your name</ng-template>
		<mat-form-field>
			<mat-label>Name</mat-label>
			<input matInput placeholder="Last name, First name" formControlName="firstCtrl" required>
		</mat-form-field>
		<div>
			<button mat-button matStepperNext>Next</button>
		</div>
		</form>
	</mat-step>
	<mat-step [stepControl]="secondFormGroup" optional>
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

	.mat-mdc-form-field {
	margin-top: 16px;
	}


	`,
	standalone: true,
	imports: [
		MatStepperModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
})
export class StepperLabelPositionBottomExample {
	_formBuilder = inject(FormBuilder);
	firstFormGroup = this._formBuilder.group({
		firstCtrl: ['', Validators.required],
	});
	secondFormGroup = this._formBuilder.group({
		secondCtrl: ['', Validators.required],
	});

	constructor () { }
}
