import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe} from '@angular/common';

/**
 * @title Stepper responsive
 */
@Component({
	selector: 'stepper-responsive-example',
	template: `

	@switch (stepperOrientation | async) {
	@case ('horizontal') {
		<div>Make your screen smaller to see a vertical stepper</div>
	}
	@case ('vertical') {
		<div>Make your screen larger to see a horizontal stepper</div>
	}
	}

	<mat-stepper
	class="example-stepper"
	[orientation]="(stepperOrientation | async)!">
	<mat-step [stepControl]="firstFormGroup" label="Fill out your name">
		<form [formGroup]="firstFormGroup">
		<mat-form-field>
			<mat-label>Name</mat-label>
			<input matInput placeholder="Last name, First name" formControlName="firstCtrl" required>
		</mat-form-field>
		<div>
			<button mat-button matStepperNext>Next</button>
		</div>
		</form>
	</mat-step>
	<mat-step [stepControl]="secondFormGroup" label="Fill out your address">
		<form [formGroup]="secondFormGroup">
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
	<mat-step [stepControl]="thirdFormGroup" label="Fill out your phone number">
		<form [formGroup]="thirdFormGroup">
		<mat-form-field>
			<mat-label>Phone number</mat-label>
			<input matInput formControlName="thirdCtrl" placeholder="Ex. 12345678" required>
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
		</div>
	</mat-step>
	</mat-stepper>

	`,
	styles: `

	.example-stepper {
	margin-top: 8px;
	}

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
		AsyncPipe,
	],
})
export class StepperResponsiveExample {
	_formBuilder = inject(FormBuilder);
	firstFormGroup = this._formBuilder.group({
		firstCtrl: ['', Validators.required],
	});
	secondFormGroup = this._formBuilder.group({
		secondCtrl: ['', Validators.required],
	});
	thirdFormGroup = this._formBuilder.group({
		thirdCtrl: ['', Validators.required],
	});
	stepperOrientation: Observable<StepperOrientation>;

	constructor (
		breakpointObserver: BreakpointObserver,
	) {
		this.stepperOrientation = breakpointObserver
			.observe('(min-width: 800px)')
			.pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
	}
}
