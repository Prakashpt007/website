import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Input with a clear button
 */
@Component({
	selector: 'input-clearable-example',
	template: `
	<h6>Input with a clear button</h6>
	<mat-form-field class="example-form-field">
	<mat-label>Clearable input</mat-label>
	<input matInput type="text" [(ngModel)]="value">
	@if (value) {
		<button matSuffix mat-icon-button aria-label="Clear" (click)="value=''">
		<mat-icon>close</mat-icon>
		</button>
	}
	</mat-form-field>

	`,
	styles: `

	.example-form-field {
		width: 200px;
	}

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
})
export class InputClearableExample {
	value = 'Clear me';
}
