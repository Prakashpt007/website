import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';

/**
 * @title Stepper lazy content rendering
 */
@Component({
	selector: 'stepper-lazy-content-example',
	template: `
	<h6>Stepper lazy content rendering</h6>
	<mat-stepper orientation="vertical">
	<mat-step>
		<ng-template matStepLabel>Step 1</ng-template>
		<ng-template matStepContent>
		<p>This content was rendered lazily</p>
		<button mat-button matStepperNext>Next</button>
		</ng-template>
	</mat-step>
	<mat-step>
		<ng-template matStepLabel>Step 2</ng-template>
		<ng-template matStepContent>
		<p>This content was also rendered lazily</p>
		<button mat-button matStepperPrevious>Back</button>
		<button mat-button matStepperNext>Next</button>
		</ng-template>
	</mat-step>
	<mat-step>
		<ng-template matStepLabel>Step 3</ng-template>
		<p>This content was rendered eagerly</p>
		<button mat-button matStepperPrevious>Back</button>
	</mat-step>
	</mat-stepper>


	`,
	standalone: true,
	imports: [MatStepperModule, MatButtonModule],
})
export class StepperLazyContentExample { }
