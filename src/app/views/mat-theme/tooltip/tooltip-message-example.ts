import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Tooltip with a changing message
 */
@Component({
	selector: 'tooltip-message-example',
	template: `
	<h6>Tooltip with a changing message</h6>
	<mat-form-field class="example-user-input">
	<mat-label>Tooltip message</mat-label>
	<input matInput [formControl]="message">
	</mat-form-field>

	<button mat-raised-button
			[matTooltip]="message.value || ''"
			aria-label="Button that displays a tooltip with a custom message">
	Action
	</button>

	`,
	styles: `
	.example-user-input {
	margin-right: 8px;
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
export class TooltipMessageExample {
	message = new FormControl('Info about the action');
}
