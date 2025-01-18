import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, ValidatorFn, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {trigger, transition, style, animate} from '@angular/animations';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-bank-account-form',
	templateUrl: './bank-account-form.component.html',
	styleUrl: './bank-account-form.component.scss',
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
export class BankAccountFormComponent {
	@ViewChild("rejectDocModal") rejectDocModal!: ElementRef;
	@ViewChild("approveDocModal") approveDocModal!: ElementRef;
	@ViewChild("thumbnailModal") thumbnailModal!: ElementRef;
	formData!: any;
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
	thumbnailModalSrc!: string;
	thumbnailModalName!: string | undefined;
	private selectedFile: File | null = null;

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
		// Form Build
		this.form = this.formBuilder.group({
			accountName: [""],
			accountNumber: [""],
			bankName: [""],
			branchName: [""],
			ifsc: [""],
			pennyDropStatus: [""],
			transactionDoc: [""],
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


	createFormData (): FormData {
		const formData = new FormData();

		// Append other form fields
		Object.keys(this.form.controls).forEach(key => {
			if (key !== 'transactionDoc') {
				formData.append(key, this.form.get(key)?.value);
			}
		});

		// Append file if it exists
		if (this.selectedFile) {
			formData.append('transactionDoc', this.selectedFile, this.selectedFile.name);
		}

		return formData;
	}
	formSubmit () {
		this.formSubmitHandler = true;
		if (this.form.invalid) {
			return;
		} else {
			if (this.pageId != 0 || this.pageId != undefined) {

				const formData = this.createFormData();

				// Log FormData contents (for debugging)
				formData.forEach((value, key) => {
					console.log(key, value);
				});

				this.genericHttp.storeFormData(formData, `${ this.pageId }/bank-account-doc-validation/store-details`).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.success == true) {
							this.toastr.success(`Data Updated Successfully`, `Success`);
							// this.router.navigate(["/finance-qa/bank-account/list"]);
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

		this.genericHttp.getFormData(`${ pageId }/bank-account-doc-validation/get-details`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {


					if (this.formUpdateFlag) {
						// response.data.form.transactionDoc.type = 'image/png, image/jpg, image/jpeg';
						// response.data.form.transactionDoc.value = "https://s3-ap-south-1.amazonaws.com/dev-s3-crop/dev/entity-docs/passbook/8-12.jpg";
						// response.data.form.transactionDoc.value = "https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg";
						// response.data.form.pennyDropStatus.value = "YES";

						// response.data.form['transactionDoc'].required = false;
						// response.data.form['transactionDoc'].value = '';
						// response.data.form['pennyDropStatus'].required = false;
						this.formData = response.data.form;

						// this.formData['transactionDoc'].value = null;

						// Disable or make fields readonly after patching values
						for (const key in this.formData) {
							if (response.data.form.hasOwnProperty(key)) {
								const value = response.data.form[key];
								// console.log(`${key}: ${value.readonly}`);

								// Access the FormControl by name
								const control = this.form.get(key);

								if (control) {

									if (value !== 'transactionDoc') {
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

						// const transactionDoc = this.form.get('transactionDoc');
						// if (this.formData.pennyDropStatus.value == "YES") {

						// 	if (this.formData['transactionDoc'].value != null || this.formData['transactionDoc'].value != '') {
						// 		this.transDocShow = true;
						// 		response.data.form['transactionDoc'].required = false;
						// 		transactionDoc?.clearValidators();
						// 		transactionDoc?.disable();
						// 		this.disabledTransDoc = false;
						// 		transactionDoc?.updateValueAndValidity();
						// 	} else {
						// 		transactionDoc?.enable();
						// 		transactionDoc?.setValidators([Validators.required]);
						// 		transactionDoc?.updateValueAndValidity();
						// 		this.disabledTransDoc = true;
						// 	}

						// } else {
						// 	response.data.form['transactionDoc'].required = false;
						// 	transactionDoc?.clearValidators();
						// 	transactionDoc?.disable();
						// 	this.disabledTransDoc = false;
						// 	transactionDoc?.updateValueAndValidity();
						// }

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

	fileUploadEvent (event: any): void {
		const files = event.target.files as FileList;
		const file = files[0] as File;

		if (this.formData['transactionDoc'].type.includes(file.type)) {
			this.selectedFile = file;
			this.form.get('transactionDoc')?.setValue(file.name); // Set the file name in the form control

		} else {
			this.toastr.warning(`Please Select Valid File (JPEG,JPG, PNG)`, `Warning`);
			this.form.get('transactionDoc')?.reset();
			this.selectedFile = null;
		}

	}

	pennydropValueChangeEvent (event: any) {
		const control = this.form.get('transactionDoc');
		if (event.target.value == "NO") {
			this.form.get('transactionDoc')?.disable();
			this.formData['transactionDoc'].required = false;
			control?.clearValidators();
			this.disabledTransDoc = true;
			control?.setValue(null);
			this.selectedFile = null;
		} else {
			this.form.get('transactionDoc')?.enable();
			this.formData['transactionDoc'].required = true;
			control?.setValidators([Validators.required]);
			this.disabledTransDoc = false;
		}
		control?.updateValueAndValidity();
	}

	changeDocument () {
		const control = this.form.get('transactionDoc');
		this.form.get('transactionDoc')?.enable();
		control?.setValue(null);
		this.formData['transactionDoc'].required = true;
		control?.setValidators([Validators.required]);
		this.disabledTransDoc = false;
		this.transDocShow = false;
		control?.updateValueAndValidity();
	}


	getRejectedSts (event: any) {
		if (event) {
			this.toastr.success("Document Rejected", "Success");
			this.router.navigate(["/finance-qa/bank-account/list"]);
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



	thumbnailViewEvent (thumbnailUrl: string, name?: string) {
		this.thumbnailModalSrc = thumbnailUrl;
		this.thumbnailModalName = name;
		this.modalService.open(this.thumbnailModal, {size: 'lg', scrollable: true, centered: true}).result.then(
			(result) => {
				// console.log(`Closed with: ${ result }`);
			},
			(reason) => {
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
			}
		);
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
}
