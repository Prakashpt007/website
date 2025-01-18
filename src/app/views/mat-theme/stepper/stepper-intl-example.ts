import {Component, inject, Injectable} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperIntl, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';

@Injectable()
export class StepperIntl extends MatStepperIntl {
	// the default optional label text, if unspecified is "Optional"
	override optionalLabel = 'Optional Label';
}

/**
 * @title Stepper that uses the MatStepperIntl service
 */
@Component({
	selector: 'stepper-intl-example',
	template: `
	<h6>Stepper that uses the MatStepperIntl service</h6>
	<label for="demo-optional-label-group">Pick the text for the optional label</label>
	<mat-radio-group
	id="demo-optional-label-group"
	class="demo-radio-group"
	[(ngModel)]="optionalLabelText"
	(ngModelChange)="updateOptionalLabel()">
	@for (optionalLabelTextChoice of optionalLabelTextChoices; track optionalLabelTextChoice) {
		<mat-radio-button
		class="demo-radio-button"
		[value]="optionalLabelTextChoice">{{optionalLabelTextChoice}}</mat-radio-button>
	}
	</mat-radio-group>
	<mat-stepper class="demo-stepper" #stepper>
	<mat-step [stepControl]="firstFormGroup">
		<form [formGroup]="firstFormGroup">
		<ng-template matStepLabel>Fill out your name</ng-template>
		<mat-form-field class="demo-form-field">
			<mat-label>Name</mat-label>
			<input
			matInput
			placeholder="Last name, First name"
			formControlName="firstCtrl"
			required
			/>
		</mat-form-field>
		<div>
			<button mat-button matStepperNext>Next</button>
		</div>
		</form>
	</mat-step>
	<mat-step
		[stepControl]="secondFormGroup"
		label="Fill out your address"
		optional>
		<form [formGroup]="secondFormGroup">
		<mat-form-field>
			<mat-label>Address</mat-label>
			<input
			matInput
			formControlName="secondCtrl"
			placeholder="Ex. 1 Main St, New York, NY"
			/>
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

	.demo-stepper {
	margin-top: 8px;
	}

	.demo-form-field {
	margin-top: 16px;
	}

	.demo-radio-group {
	display: flex;
	flex-direction: column;
	margin: 15px 0;
	}

	.demo-radio-button {
	margin: 5px;
	}

	`,
	providers: [{provide: MatStepperIntl, useClass: StepperIntl}],
	standalone: true,
	imports: [
		MatRadioModule,
		FormsModule,
		MatStepperModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
})
export class StepperIntlExample {
	optionalLabelText!: string;
	optionalLabelTextChoices: string[] = ['Option 1', 'Option 2', 'Option 3'];
	_formBuilder = inject(FormBuilder);
	firstFormGroup = this._formBuilder.group({
		firstCtrl: ['', Validators.required],
	});
	secondFormGroup = this._formBuilder.group({
		secondCtrl: ['', Validators.required],
	});

	constructor (
		private _matStepperIntl: MatStepperIntl,
	) { }

	updateOptionalLabel () {
		this._matStepperIntl.optionalLabel = this.optionalLabelText;
		// Required for the optional label text to be updated
		// Notifies the MatStepperIntl service that a change has been made
		this._matStepperIntl.changes.next();
	}
}
