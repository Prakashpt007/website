import {trigger, transition, style, animate} from '@angular/animations';
import {ChangeDetectorRef, Component} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../../services/generic-http.service';
import {AppState} from '../../../../../utility/store/store.reducer';

@Component({
	selector: 'app-leased-land-form',
	templateUrl: './leased-land-form.component.html',
	styleUrl: './leased-land-form.component.scss',
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
export class LeasedLandFormComponent {
	formData!: any;
	form!: FormGroup;
	formSubmitHandler = false;

	formErrorData: any = {};

	docs!: any;

	pageId!: number;
	backUrlParams!: any;

	regionList!: any[];
	warehouseList!: any[];
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
			ownershipType: [""],
			farmName: [""],
			ownerName: [""],
			lessor: [""],
			lessees: [""],
			registrationNo: [""],
			mutationNo: [""],
			saleDeedNo: [""],
			registrationDate: [""],
			leasedFromDate: ["", [this.minValueValidator(this.getMaxBackDate()), this.maxValueValidator(this.getMinFutureDate())]],
			leasedTillDate: ["", [this.minValueValidator(this.getRestrictBackDate()), this.maxValueValidator(this.getRestrictFutureDate())]],
			documentedAreaSqm: ["", Validators.min(1)],
			surveyNo: [""],
			regionId: [""],
			warehouseId: [""],
		});

		this.getRegionDList();
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

				formObjectData['ownershipType'] = this.form.get('ownershipType')?.value;
				formObjectData['farmName'] = this.form.get('farmName')?.value;
				formObjectData['ownerName'] = this.form.get('ownerName')?.value;
				formObjectData['lessor'] = this.form.get('lessor')?.value;
				formObjectData['lessees'] = this.form.get('lessees')?.value;
				formObjectData['registrationNo'] = this.form.get('registrationNo')?.value;
				formObjectData['mutationNo'] = this.form.get('mutationNo')?.value;
				formObjectData['saleDeedNo'] = this.form.get('saleDeedNo')?.value;
				formObjectData['registrationDate'] = this.form.get('registrationDate')?.value;
				formObjectData['leasedFromDate'] = this.form.get('leasedFromDate')?.value;
				formObjectData['leasedTillDate'] = this.form.get('leasedTillDate')?.value;
				formObjectData['documentedAreaSqm'] = this.form.get('documentedAreaSqm')?.value;
				formObjectData['surveyNo'] = this.form.get('surveyNo')?.value;
				formObjectData['regionId'] = this.form.get('regionId')?.value;
				formObjectData['warehouseId'] = this.form.get('warehouseId')?.value;

				this.genericHttp.storeObjectDataByPatchMethod(formObjectData, `${ this.pageId }/farm-bnt-errors/store-details`).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.success == true) {
							this.toastr.success(`Data Updated Successfully`, `Success`);
							// this.router.navigate(["/finance-qa/bnt-error/leased-land/list"]);
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

	// -------------------------- //

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

		this.genericHttp.getFormData(`${ pageId }/farm-bnt-errors/get-details`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {

					if (this.formUpdateFlag) {
						this.formData = response.data.form;
						if (this.formData.regionId.value) {
							this.getWarehouseDList(Number(this.formData.regionId.value));
						}

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


	getRegionDList () {
		this.genericHttp.getRegionDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.regionList = response.data;
					console.log(this.regionList);

				} else {
					this.regionList = [];
					this.toastr.error(`${ response.message }`, `${ 'Error' }`);
				}
			},
			error: (err: Error) => {

			},
			complete: () => {

			}
		});
	}



	regionChangeEvent (event: any) {
		this.getWarehouseDList(Number(event.target.value));
		this.form.get('warehouseId')?.reset();
	}

	getWarehouseDList (regionId: number) {
		this.warehouseList = [];
		this.genericHttp.getWhDListByRegionId(regionId).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.warehouseList = response.data;
				} else {
					this.warehouseList = [];
					this.toastr.error(`${ response.message }`, `${ 'Error' }`);
				}
			},
			error: (err: Error) => {

			},
			complete: () => {

			}
		});
	}
}
