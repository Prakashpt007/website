import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Form field with prefix & suffix */
@Component({
	selector: 'form-field-prefix-suffix-example',
	template: `
	<h6>Form field with prefix & suffix</h6>
	<div class="example-container">
	<mat-form-field>
		<mat-label>Enter your password</mat-label>
		<input matInput [type]="hide ? 'password' : 'text'">
		<button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
		<mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
		</button>
	</mat-form-field>

	<mat-form-field floatLabel="always">
		<mat-label>Amount</mat-label>
		<input matInput type="number" class="example-right-align" placeholder="0">
		<span matTextPrefix>$&nbsp;</span>
		<span matTextSuffix>.00</span>
	</mat-form-field>
	</div>


	`,
	styles: `

	.example-container mat-form-field + mat-form-field {
	margin-left: 8px;
	}

	.example-right-align {
	text-align: right;
	}

	input.example-right-align::-webkit-outer-spin-button,
	input.example-right-align::-webkit-inner-spin-button {
	display: none;
	}

	input.example-right-align {
	-moz-appearance: textfield;
	}


	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
})
export class FormFieldPrefixSuffixExample {
	hide = true;
}
