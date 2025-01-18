import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
	MatSlideToggleModule,
	_MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';

/**
 * @title Slide-toggle with forms
 */
@Component({
	selector: 'slide-toggle-forms-example',
	template: `

	<p>Slide Toggle using a simple NgModel.</p>

	<mat-slide-toggle [(ngModel)]="isChecked">Slide Toggle Checked: {{isChecked}}</mat-slide-toggle>

	<p>Slide Toggle inside of a Template-driven form</p>

	<form class="example-form" #form="ngForm" (ngSubmit)="alertFormValues(form.form)">

	<mat-slide-toggle ngModel name="enableWifi">Enable Wifi</mat-slide-toggle>
	<mat-slide-toggle ngModel name="acceptTerms" required>Accept Terms of Service</mat-slide-toggle>

	<button mat-raised-button type="submit">Save Settings</button>
	</form>

	<p>Slide Toggle inside of a Reactive form</p>

	<form class="example-form" [formGroup]="formGroup" (ngSubmit)="alertFormValues(formGroup)" ngNativeValidate>

	<mat-slide-toggle formControlName="enableWifi">Enable Wifi</mat-slide-toggle>
	<mat-slide-toggle formControlName="acceptTerms">Accept Terms of Service</mat-slide-toggle>

	<p>Form Group Status: {{formGroup.status}}</p>

	<button mat-raised-button type="submit">Save Settings</button>
	</form>


	`,
	styles: `

	.example-form mat-slide-toggle {
	margin: 8px 0;
	display: block;
	}


	`,
	standalone: true,
	imports: [
		MatSlideToggleModule,
		FormsModule,
		_MatSlideToggleRequiredValidatorModule,
		MatButtonModule,
		ReactiveFormsModule,
	],
})
export class SlideToggleFormsExample {
	_formBuilder = inject(FormBuilder);
	isChecked = true;
	formGroup = this._formBuilder.group({
		enableWifi: '',
		acceptTerms: ['', Validators.requiredTrue],
	});

	constructor () { }

	alertFormValues (formGroup: FormGroup) {
		alert(JSON.stringify(formGroup.value, null, 2));
	}
}
