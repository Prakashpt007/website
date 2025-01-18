import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Tooltip with a show and hide delay
 */
@Component({
	selector: 'tooltip-delay-example',
	template: `
	<h6>Tooltip with a show and hide delay</h6>
	<mat-form-field class="example-user-input">
	<mat-label>Show delay</mat-label>
	<input matInput type="number" [formControl]="showDelay"
			aria-label="Adds a delay between hovering over the button and displaying the tooltip">
	<mat-hint>milliseconds</mat-hint>
	</mat-form-field>

	<mat-form-field class="example-user-input mb-4">
	<mat-label>Hide delay</mat-label>
	<input matInput type="number" [formControl]="hideDelay"
			aria-label="Adds a delay between hovering away from the button and hiding the tooltip">
	<mat-hint>milliseconds</mat-hint>
	</mat-form-field>

	<button mat-raised-button matTooltip="Info about the action"
			[matTooltipShowDelay]="showDelay.value"
			[matTooltipHideDelay]="hideDelay.value"
			aria-label="Button that displays a tooltip with a customized delay in showing and hiding">
	Action
	</button>

	`,
	styles: `
	.mat-form-field + .mat-form-field,
	.mat-raised-button {
	margin-left: 8px;
	}

	`,
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatTooltipModule,
	],
})
export class TooltipDelayExample {
	showDelay = new FormControl(1000);
	hideDelay = new FormControl(2000);
}
