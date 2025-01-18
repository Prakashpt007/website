import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Tooltip that can be disabled
 */
@Component({
	selector: 'tooltip-disabled-example',
	template: `
	<h6>Tooltip that can be disabled</h6>
	<button mat-raised-button
        matTooltip="Info about the action"
        [matTooltipDisabled]="disabled.value"
        aria-label="Button that displays a tooltip that can be programmatically disabled">
	Action
	</button>

	<mat-checkbox [formControl]="disabled" class="example-disabled-checkbox">
	Tooltip disabled
	</mat-checkbox>

	`,
	styles: `
	.example-disabled-checkbox {
	margin-left: 8px;
	}

	`,
	standalone: true,
	imports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
})
export class TooltipDisabledExample {
	disabled = new FormControl(false);
}
