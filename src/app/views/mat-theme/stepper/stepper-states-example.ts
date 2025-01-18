import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';

/**
 * @title Stepper with customized states
 */
@Component({
	selector: 'stepper-states-example',
	template: `
	<h6>Stepper with customized states</h6>
	<mat-stepper #stepper>
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
	<mat-step [stepControl]="secondFormGroup">
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

	<mat-stepper>
	<mat-step label="Step 1" state="phone">
		<p>Put down your phones.</p>
		<div>
		<button mat-button matStepperNext>Next</button>
		</div>
	</mat-step>
	<mat-step label="Step 2" state="chat">
		<p>Socialize with each other.</p>
		<div>
		<button mat-button matStepperPrevious>Back</button>
		<button mat-button matStepperNext>Next</button>
		</div>
	</mat-step>
	<mat-step label="Step 3">
		<p>You're welcome.</p>
	</mat-step>

	<!-- Icon overrides. -->
	<ng-template matStepperIcon="phone">
		<mat-icon>call_end</mat-icon>
	</ng-template>
	<ng-template matStepperIcon="chat">
		<mat-icon>forum</mat-icon>
	</ng-template>
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
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: {displayDefaultIndicatorType: false},
		},
	],
	standalone: true,
	imports: [
		MatStepperModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
})
export class StepperStatesExample {
	_formBuilder = inject(FormBuilder);
	firstFormGroup = this._formBuilder.group({
		firstCtrl: ['', Validators.required],
	});
	secondFormGroup = this._formBuilder.group({
		secondCtrl: ['', Validators.required],
	});

	constructor () { }
}
