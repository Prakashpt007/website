import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Form field appearance variants */
@Component({
	selector: 'form-field-appearance-example',
	template: `
	<h6>Form field appearance variants</h6>
	<p>
		<mat-form-field appearance="fill">
			<mat-label>Fill form field</mat-label>
			<input matInput placeholder="Placeholder">
			<mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
			<mat-hint>Hint</mat-hint>
		</mat-form-field>
		</p>
		<p>
		<mat-form-field appearance="outline">
			<mat-label>Outline form field</mat-label>
			<input matInput placeholder="Placeholder">
			<mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
			<mat-hint>Hint</mat-hint>
		</mat-form-field>
	</p>

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatIconModule],
})
export class FormFieldAppearanceExample { }
