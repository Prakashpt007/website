import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
	selector: 'app-company-turnover-form',
	templateUrl: './company-turnover-form.component.html',
	styleUrl: './company-turnover-form.component.scss',
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
export class CompanyTurnoverFormComponent {
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
		private router: Router,
		private route: ActivatedRoute,
	) {
		// Form Build
		this.form = this.formBuilder.group({
			companyName: [""],
			assessmentYear: [""],
			turnoverPaisa: [""],
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
				formObjectData['assessmentYear'] = this.form.get('assessmentYear')?.value;
				formObjectData['turnoverPaisa'] = this.form.get('turnoverPaisa')?.value;

				this.genericHttp.storeObjectDataByPatchMethod(formObjectData, `${ this.pageId }/company-proof-of-turnover-doc-validation/store-details`).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.success == true) {
							this.toastr.success(`Data Updated Successfully`, `Success`);
							// this.router.navigate(["/finance-qa/company-turnover/list"]);
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

	getData (pageId: number) {

		this.genericHttp.getFormData(`${ pageId }/company-proof-of-turnover-doc-validation/get-details`).subscribe({
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

	getRejectedSts (event: any) {
		if (event) {
			this.toastr.success("Document Rejected", "Success");
			this.router.navigate(["/finance-qa/company-turnover/list"]);
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
