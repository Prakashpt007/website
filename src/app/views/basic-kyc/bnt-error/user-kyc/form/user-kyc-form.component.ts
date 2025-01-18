import {trigger, transition, style, animate} from '@angular/animations';
import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../../services/generic-http.service';
import {AppState} from '../../../../../utility/store/store.reducer';

@Component({
	selector: 'app-user-kyc-form',
	templateUrl: './user-kyc-form.component.html',
	styleUrl: './user-kyc-form.component.scss',
	standalone: false,
	animations: [
		trigger("fade", [
			transition("void => *", [
				style({opacity: 0}),
				animate(300, style({opacity: 1})),
			]),
		]),
	],
})

export class UserKycFormComponent {

	formData!: any;
	form!: FormGroup;
	formSubmitHandler = false;

	formErrorData: any = {};

	minDate!: any;
	maxDate!: any;

	docs!: any;

	pageId!: number;
	backUrlParams!: any;
	formUpdateFlag: boolean = true;

	constructor (
		private store: Store<AppState>,
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private changeDetectorRef: ChangeDetectorRef,
		private genericHttp: GenericHttpService,
		private router: Router,
		private route: ActivatedRoute,
	) {

		// Form Build
		this.form = this.formBuilder.group({
			userFullName: [""],
			aadhar: ["", this.genericHttp.aadharRegex()],
			pan: ["", this.genericHttp.panRegex()],
			gender: [""],
			dob: [""],
			age: new FormControl({value: "", disabled: true}),
			address: [""],
			pincode: ["", this.genericHttp.pincodeRegex()],
		});

		this.setDate();
	}

	ngOnInit (): void {

		if (this.route.snapshot.paramMap.get("id") != null) {
			this.pageId = Number(`${ this.route.snapshot.paramMap.get("id") }`);
			this.getData(this.pageId);
		}

		// Get backurl params from store and set value to backurl with params
		this.store.select('store').subscribe({
			next: (response) => {
				this.backUrlParams = response.backUrl;
			}
		});

	}

	get f (): {[key: string]: AbstractControl;} {
		return this.form.controls;
	}

	formSubmit () {
		this.formSubmitHandler = true;
		if (this.form.invalid) {
			return;
		} else {
			if (this.pageId != 0 || this.pageId != undefined) {
				const formObjectData: any = {};

				formObjectData['userFullName'] = this.form.get('userFullName')?.value;
				formObjectData['aadhar'] = this.form.get('aadhar')?.value;
				formObjectData['pan'] = this.form.get('pan')?.value;
				formObjectData['gender'] = this.form.get('gender')?.value;
				formObjectData['dob'] = this.form.get('dob')?.value;
				formObjectData['address'] = this.form.get('address')?.value;
				formObjectData['pincode'] = this.form.get('pincode')?.value;

				this.genericHttp.storeObjectDataByPatchMethod(formObjectData, `${ this.pageId }/basic-kyc-bnt-errors/store-details`).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.success == true) {
							this.toastr.success(`Data Updated Successfully`, `Success`);
							// this.router.navigate(["/basic-kyc/bnt-error/user-kyc/list"]);
							this.formUpdateFlag = true;
							this.getData(this.pageId);
						} else {
							alert('Error');
						}
					},
					error: (err: any) => {
						if (err.error.status == 422) {
							this.formErrorData = err.error.errors;

							Object.keys(this.formErrorData).forEach(fieldName => {
								const control = this.form.get(fieldName);

								if (control) {
									const errorMessages = this.formErrorData[fieldName];
									control.setErrors({backendError: errorMessages});
								}
							});
							this.changeDetectorRef.detectChanges();
							this.toastr.error(err.error.message, `Error`);
						} else {
							this.toastr.error(err.error, `Error`);
						}
					},
					complete: () => {
						// console.log('completed');
					}
				});
			} else {
				this.toastr.warning('Invalid Request ID', 'Warning');
			}
		}
	}

	setDate () {
		let date = new Date();
		let date2 = new Date();
		date.setFullYear(date.getFullYear() - 18);
		this.maxDate = date.toISOString().split("T")[0];
		// this.maxDate = date.toISOString().split("T")[0];
		date2.setFullYear(date2.getFullYear() - 100);
		this.minDate = date2.toISOString().split("T")[0];
	}

	dobUpdate () {
		if (this.form.value.dob != null && this.form.value.dob != "") {
			this.form.patchValue({
				age: moment().diff(this.form.value.dob, "years"),
			});
		};

		this.form.getRawValue();
	}


	getData (pageId: number) {

		this.genericHttp.getFormData(`${ pageId }/basic-kyc-bnt-errors/get-details`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {
					if (this.formUpdateFlag) {
						this.formData = response.data.form;

						// Disable or make fields readonly after patching values
						for (const key in response.data.form) {
							if (response.data.form.hasOwnProperty(key)) {
								const value = response.data.form[key];
								// console.log(`${key}: ${value.readonly}`);

								// Access the FormControl by name
								const control = this.form.get(key);

								if (control) {

									control.patchValue(value.value != null ? value.value : "");

									if (value.required) {
										console.log(`'${ key }' is required`);
										// Set the 'required' validator

										const existingValidatorFn: ValidatorFn | null = control.validator;

										// Create a new array of validators, including Validators.required
										const newValidators: ValidatorFn[] = [Validators.required];

										// If existing validators exist, add them to the array
										if (existingValidatorFn) {
											newValidators.push(existingValidatorFn);
										}

										// Set the new array of validators for the control
										control.setValidators(newValidators);

										// Update the control's validation
										control.updateValueAndValidity();

									}
									if (value.readonly) {
										control.disable();
										// console.log(`'${key}' is readonly`);
									} else {
										// console.log(`'${key}' is not readonly`);
										// control.patchValue(value.value != null ? value.value : "");
									}
								} else {
									console.log(`'${ key }' not found in the form group.`);
								}
							}
						}
					}

					this.docs = response.data.docWidget;

					this.dobUpdate();

				} else {
					this.toastr.error("Details Not Found", `Failed`);
				}
			},
			error: (err: Error) => {
				// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
				this.toastr.error(err.message, `Error`);
				this.router.navigate(["/dashboard"]);
			},
			complete: () => {
				// console.log('completed');

			}
		});
	}

}
