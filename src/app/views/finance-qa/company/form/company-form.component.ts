import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, ValidationErrors} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {animate, style, transition, trigger} from '@angular/animations';
import {GenericFunctionService} from '../../../../services/generic-function.service';

export function atLeastOnePhoneRequired (): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const phones = control as FormArray;
		const hasAtLeastOnePhone = phones.controls.some(phoneControl => phoneControl.value.trim() !== '');
		return hasAtLeastOnePhone ? null : {atLeastOneRequired: true};
	};
}

@Component({
	selector: 'app-company-form',
	templateUrl: './company-form.component.html',
	styleUrl: './company-form.component.scss',
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
export class CompanyFormComponent {
	@ViewChild("rejectDocModal") rejectDocModal!: ElementRef;
	@ViewChild("approveDocModal") approveDocModal!: ElementRef;

	formData!: any;
	form!: FormGroup;
	formSubmitHandler = false;

	formErrorData: any = {};

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
		private genericFunctionService: GenericFunctionService,
		private router: Router,
		private route: ActivatedRoute,
	) {
		// Form Build
		this.form = this.formBuilder.group({
			companyName: [""],
			businessEntityType: [""],
			licenseNo: [""],
			licenseIssueDate: ["", [this.minValueValidator(this.getMaxBackDate()), this.maxValueValidator(this.getMinFutureDate())]],
			licenseExpiryDate: ["", [this.minValueValidator(this.getRestrictBackDate()), this.maxValueValidator(this.getRestrictFutureDate())]],
			dateOfIncorporation: ["", [this.minValueValidator(this.getMaxBackDate()), this.maxValueValidator(this.getMinFutureDate())]],
			website: ["", this.genericHttp.urlRegex()],
			nationality: [""],
			constitution: [""],
			address: [""],
			cin: ["", this.genericHttp.cinRegex()],
			gstn: ["", this.genericHttp.gstRegex()],
			pan: ["", this.genericHttp.panRegex()],
			pincode: ["", this.genericHttp.pincodeRegex()],
			phones: this.formBuilder.array([], atLeastOnePhoneRequired()),
			importExportCode: [""],
			importLicenseNo: [""],
			exportLicenseNo: [""],
		});
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

				formObjectData['companyName'] = this.form.get('companyName')?.value;
				formObjectData['businessEntityType'] = this.form.get('businessEntityType')?.value;
				formObjectData['licenseNo'] = this.form.get('licenseNo')?.value;
				formObjectData['licenseIssueDate'] = this.form.get('licenseIssueDate')?.value;
				formObjectData['licenseExpiryDate'] = this.form.get('licenseExpiryDate')?.value;
				formObjectData['dateOfIncorporation'] = this.form.get('dateOfIncorporation')?.value;
				formObjectData['website'] = this.form.get('website')?.value;
				formObjectData['nationality'] = this.form.get('nationality')?.value;
				formObjectData['constitution'] = this.form.get('constitution')?.value;
				formObjectData['address'] = this.form.get('address')?.value;
				formObjectData['aadhar'] = this.form.get('aadhar')?.value;
				formObjectData['cin'] = this.form.get('cin')?.value;
				formObjectData['gstn'] = this.form.get('gstn')?.value;
				formObjectData['pan'] = this.form.get('pan')?.value;
				formObjectData['pincode'] = this.form.get('pincode')?.value;
				formObjectData['phone'] = this.form.get('phones')?.value.join(', ');
				formObjectData['importExportCode'] = this.form.get('importExportCode')?.value;
				formObjectData['importLicenseNo'] = this.form.get('importLicenseNo')?.value;
				formObjectData['exportLicenseNo'] = this.form.get('exportLicenseNo')?.value;

				this.genericHttp.storeObjectDataByPatchMethod(formObjectData, `${ this.pageId }/company-doc-validation/store-details`).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.success == true) {
							this.toastr.success(`Data Updated Successfully`, `Success`);
							// this.router.navigate(["/finance-qa/company/list"]);
							this.formUpdateFlag = true;
							this.getData(this.pageId);
						} else {
							alert('Error');
						}
					},
					error: (err: any) => {
						if (err.error.status == 422) {

							this.formErrorData = err.error.data.formData.errors;

							Object.keys(this.formErrorData).forEach(item => {
								const control = this.form.get(this.formErrorData[item].name);

								if (control) {
									const errorMessages = this.formErrorData[item].errorMessage;
									control.setErrors({backendError: errorMessages});
								}
							});
							this.changeDetectorRef.detectChanges();
							this.toastr.error('Someting Went Wrong', `Error`);
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


	// ------------ Validators -------------- //
	minValueValidator (min: string) {
		return (control: {value: string | number | Date;}) => {
			if (control.value && control.value < min) {
				return {'min': true};
			}
			return null;
		};
	}

	maxValueValidator (max: string) {
		return (control: {value: string | number | Date;}) => {
			if (control.value && control.value > max) {
				return {'max': true};
			}
			return null;
		};
	}

	// ------------ End -------------- //

	// ------------ Validators Methods -------------- //

	getRestrictBackDate () {
		let date = new Date();
		// date.setFullYear(date.getFullYear());
		return date.toISOString().split("T")[0];
	}

	getRestrictFutureDate () {
		let date = new Date();
		date.setFullYear(date.getFullYear() + 100);
		return date.toISOString().split("T")[0];
	}

	// -------------------------- //

	getMinFutureDate () {
		let date = new Date();
		return date.toISOString().split("T")[0];
	}

	getMaxBackDate () {
		let date = new Date();
		date.setFullYear(date.getFullYear() - 100);
		return date.toISOString().split("T")[0];
	}
	// ------------ End -------------- //
	get phones () {
		return this.form.get('phones') as FormArray;
	}

	getData (pageId: number) {

		this.genericHttp.getFormData(`${ pageId }/company-doc-validation/get-details`).subscribe({
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

									if (key != "phone") {
										control.patchValue(value.value != null ? value.value : "");
									}

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

						if (this.formData.phone) {
							const phoneNumbers = this.formData.phone.value.split(',');
							const isRequired = this.formData.phone.required;

							// Clear existing phone controls
							while (this.phones.length) {
								this.phones.removeAt(0);
							}

							// Add phone controls based on the API response
							phoneNumbers.forEach((phone: string) => this.addPhone(phone.trim(), isRequired));

							// Add the atLeastOnePhoneRequired validator if required
							if (isRequired) {
								this.phones.setValidators(atLeastOnePhoneRequired());
							} else {
								this.phones.clearValidators();
							}
							this.phones.updateValueAndValidity();
						}
					}


					this.docs = response.data.docWidget;

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
	getPhoneErrorMessage (control: AbstractControl): string | null {
		if (control.hasError('required')) {
			return 'Phone number is required.';
		}
		if (control.hasError('pattern')) {
			return 'Invalid phone number format. Please use only digits, +, -, parentheses, commas, and single spaces.';
		}
		return null;
	}

	// removePhone (index: number) {
	// const conform = confirm('Do you really want to delete this numner?');
	// if (conform) {
	// 	this.phones.removeAt(index);
	// 	this.phones.markAsDirty();
	// 	this.phones.updateValueAndValidity();
	// }
	// }

	removePhone (index: number) {
		const conform = confirm('Do you really want to delete this numner?');
		if (conform) {
			this.phones.removeAt(index);
			this.phones.markAsDirty();
			this.phones.updateValueAndValidity();
			this.changeDetectorRef.detectChanges();
		}
	}

	addPhone (phone: string, required: boolean = false) {
		const validators = [];
		const regexPattern = "^(?!.*  )[0-9,+\\-() ]+$";

		if (required) {
			validators.push(Validators.required);
		}

		validators.push(Validators.pattern(this.genericFunctionService.stringToRegex(regexPattern)));

		this.phones.push(this.formBuilder.control(phone, validators));
	}

	getRejectedSts (event: any) {
		if (event) {
			this.toastr.success("Document Rejected", "Success");
			this.router.navigate(["/finance-qa/company/list"]);
		} else {
			this.toastr.error("Someting Went Wrong", "Error");
		}

	}

	getApprovedSts (event: any) {
		if (event) {
			this.toastr.success("Document Approved", "Success");
			if (this.formUpdateFlag) {
				this.formUpdateFlag = false;
			}
			this.getData(this.pageId);
		} else {
			this.toastr.error("Someting Went Wrong", "Error");
		}

	}

}
