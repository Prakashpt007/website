import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {trigger, transition, style, animate} from '@angular/animations';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

interface Stack {
	caseWarehouseId: number,
	packageTypeUom: string,
	packageTypeUomId: number,
	noOfPackagesAsPerInvoice: number,
	stackNo: string;
}

@Component({
	selector: 'app-farmer-warehouse-form',
	templateUrl: './farmer-warehouse-form.component.html',
	styleUrl: './farmer-warehouse-form.component.scss',
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
export class FarmerWarehouseFormComponent {
	@ViewChild("addNewStack") addNewStack!: ElementRef;
	uomTypeList!: any[];
	uomList!: any[];
	formData!: any;

	stackDetailsForm!: FormGroup;
	stackDetailsFormSubmitHandler = false;
	stackDetails: Stack[] = [];
	form!: FormGroup;
	formSubmitHandler = false;

	formErrorData: any = {};

	minDate!: any;
	maxDate!: any;

	docs!: any;

	pageId!: number;
	backUrlParams!: any;

	disabledTransDoc = false;
	transDocShow = false;
	formUpdateFlag: boolean = true;

	constructor (
		private store: Store<AppState>,
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private changeDetectorRef: ChangeDetectorRef,
		private genericHttp: GenericHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private modalService: NgbModal,
	) {
		this.form = this.formBuilder.group({
			code: [""],
			name: [""],
			phone: ["", [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(6), Validators.maxLength(10)],],
			warehouseLotNo: [""],
			totalBagCount: ["", Validators.min(1)],
		});


		this.stackDetailsForm = this.formBuilder.group({
			stackNo: ["", [Validators.required]],
			noOfPackagesAsPerInvoice: ["", [Validators.required]],
			packageTypeUomId: ["", [Validators.required]],
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

	get stackF (): {[key: string]: AbstractControl;} {
		return this.stackDetailsForm.controls;
	}


	addStackEvent (caseId: any) {
		this.getUomDList(3);
		this.modalService.open(this.addNewStack, {size: 'md', scrollable: true, centered: true}).result.then(
			(result) => {

				console.log(`Closed with: ${ result }`);
			},
			(reason) => {
				this.stackDetailsForm.reset();
				this.stackDetailsFormSubmitHandler = false;
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
			}
		);
	}


	getUomDList (UomTypeId: any) {
		this.genericHttp.getUomDListByUomTypeId(UomTypeId).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.uomList = response.data;
				} else {
					this.uomList = [];
					this.toastr.error(`${ response.message }`, `${ 'Error' }`);
				}
			},
			error: (err: Error) => {
				console.log(err);
				// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
			},
			complete: () => {
				// console.log('completed');
			}
		});
	}

	stackDetailsFormSubmit () {
		this.stackDetailsFormSubmitHandler = true;
		if (this.stackDetailsForm.invalid) {
			return;
		} else {
			if (this.pageId != 0 || this.pageId != undefined) {
				const formObjectData: any = {};

				formObjectData['caseWarehouseId'] = Number(this.pageId);
				formObjectData['stackNo'] = this.stackDetailsForm.get('stackNo')?.value;
				formObjectData['noOfPackagesAsPerInvoice'] = Number(this.stackDetailsForm.get('noOfPackagesAsPerInvoice')?.value);
				formObjectData['packageTypeUomId'] = Number(this.stackDetailsForm.get('packageTypeUomId')?.value);

				this.genericHttp.storeObjectDataByPatchMethod(formObjectData, `${ this.pageId }/warehouse-doc-validation/store-stacks`).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.success == true) {
							this.toastr.success(`Data Updated Successfully`, `Success`);
							this.stackDetailsForm.reset();
							this.closeOpenedModel();
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
						console.log('completed');

					}
				});
			}
		}
	}

	formSubmit () {
		this.formSubmitHandler = true;
		if (this.form.invalid) {
			return;
		} else {
			if (this.pageId != 0 || this.pageId != undefined) {
				const formObjectData: any = {};

				formObjectData['warehouseLotNo'] = Number(this.form.get('warehouseLotNo')?.value);
				formObjectData['totalBagCount'] = Number(this.form.get('totalBagCount')?.value);
				this.genericHttp.storeObjectDataByPatchMethod(formObjectData, `${ this.pageId }/warehouse-doc-validation/store-details`).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.success == true) {
							this.toastr.success(`Data Updated Successfully`, `Success`);
							// this.router.navigate(["/warehouse-qa/farmer-warehouse/list"]);
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

	getData (pageId: number) {

		this.genericHttp.getFormData(`${ pageId }/warehouse-doc-validation/get-details`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {
					this.stackDetails = response.data.stackDetails;

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


	closeOpenedModel () {
		this.modalService.dismissAll();
	}


	private getDismissReason (reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return "by pressing ESC";
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return "by clicking on a backdrop";
		} else {
			return `with: ${ reason }`;
		}
	}


	getRejectedSts (event: any) {
		if (event) {
			this.toastr.success("Document Rejected", "Success");
			this.router.navigate(["/warehouse-qa/farmer-warehouse/list"]);
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
