/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';

/**
 * @title Stepper animations
 */
@Component({
	selector: 'stepper-animations-example',
	template: `
	<h6>Stepper animations</h6>
	<div class="example-input-wrapper input-group">
		<label for="duration" class="input-group-text">Animation duration:</label>
		<input class="form-control" id="duration" value="1000" type="number" min="0" step="100" #duration>
	</div>

	<mat-vertical-stepper [linear]="false" #stepper [animationDuration]="duration.value">
		<mat-step [stepControl]="firstFormGroup">
			<form [formGroup]="firstFormGroup">
			<ng-template matStepLabel>Fill out your name</ng-template>
			<mat-form-field>
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
				<input matInput placeholder="Address" formControlName="secondCtrl" required>
			</mat-form-field>
			<div>
				<button mat-button matStepperPrevious>Back</button>
				<button mat-button matStepperNext>Next</button>
			</div>
			</form>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Done</ng-template>
			You are now done.
			<div>
			<button mat-button matStepperPrevious>Back</button>
			<button mat-button (click)="stepper.reset()">Reset</button>
			</div>
		</mat-step>
	</mat-vertical-stepper>


	`,
	styles: `
	.example-input-wrapper {
		margin-bottom: 16px;
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
export class StepperAnimationsExample {
	_formBuilder = inject(FormBuilder);
	constructor () { }
	firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
	secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
}
