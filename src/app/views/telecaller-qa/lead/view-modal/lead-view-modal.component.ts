import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {FormFieldJSON} from '../../../../utility/formbuilder/form.field';

export interface Obj {
	readonly: boolean,
	required: boolean,
	value: string | Array<string> | undefined;
}
@Component({
	selector: 'app-lead-view-modal',
	templateUrl: './lead-view-modal.component.html',
	styleUrl: './lead-view-modal.component.scss',
	standalone: false
})
export class LeadViewModalComponent {
	@Input() requestId!: number;
	@Output() actionResponse = new EventEmitter<any>();
	@Output() modalResponse = new EventEmitter<any>();

	pageId!: number;
	pageRequestId!: string;
	pageData!: any;

	form!: FormGroup;
	formSubmitHandler = false;

	formFields: FormFieldJSON[] = [];
	rejectionReasonList!: any[];

	constructor (
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private genericHttp: GenericHttpService,
		private router: Router,
		private modalService: NgbModal
	) {
		// Form Build
		this.form = this.formBuilder.group({
			comments: ["", Validators.required],
			rejectionReasonId: ["", Validators.required],
		});

		this.formFields = [
			{
				"name": "action",
				"label": "Action",
				"type": "radio",
				"options": [
					{
						"label": "Mark As Called?",
						"value": 1
					},
					{
						"label": "Need To Reject This Lead?",
						"value": 0
					}
				],
				"value": "",
				"validators": {
					"required": true
				}
			}
		];
	}

	ngOnInit (): void {
		this.pageId = Number(`${ this.requestId }`);
		if (this.pageId != undefined) {
			this.getData();
			this.getRejectionReasonDList(2);
		}
	}

	addComponent (controls: FormFieldJSON[]): void {
		// console.log(controls[1].type == 'mobileNo');

		for (let control of controls) {
			const validators = [];
			if (control.validators?.required) {
				validators.push(Validators.required);
			}

			this.form.addControl(
				control.name,
				this.formBuilder.control(control.value != null ? control.value : '', validators)
			);
		}
	}

	getRejectionReasonDList (typeId: number) {
		this.genericHttp.getRejectionReasonDList(typeId).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.rejectionReasonList = response.data;
				} else {
					this.rejectionReasonList = [];
					this.toastr.error(`${ response.message }`, `${ 'Error' }`);
				}

			},
			error: (err: Error) => {
				// console.log(err);
				// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
			},
			complete: () => {
				// console.log('completed');
			}
		});
	}

	getcheckboxValue (event: any) {
		const comments = this.form.get('comments');
		const rejectionReasonId = this.form.get('rejectionReasonId');
		console.log(rejectionReasonId?.value);

		if (event.value == 1) {
			//Comments Control
			// comments?.setValue(null);
			if (this.pageData.comments.value != null || this.pageData.comments.value == '') {
				comments?.setValue(this.pageData.comments.value);
			} else {
				comments?.setValue(null);
			}

			comments?.setValidators([Validators.required]);


			//Reject Control
			rejectionReasonId?.setValue(null);
			rejectionReasonId?.clearValidators();

		}

		if (event.value == 0) {
			//Reject Control
			// rejectionReasonId?.setValue(null);
			if (this.pageData.rejection_reason_id.value != null || this.pageData.rejection_reason_id.value == '') {
				rejectionReasonId?.setValue(this.pageData.rejection_reason_id.value);
			} else if (rejectionReasonId?.value != null) {
				// rejectionReasonId?.setValue(rejectionReasonId?.value);
			} else {
				rejectionReasonId?.setValue(null);
			}
			rejectionReasonId?.setValidators([Validators.required]);


			//Comments Control
			comments?.setValue(null);
			comments?.clearValidators();

		}

		comments?.updateValueAndValidity();
		rejectionReasonId?.updateValueAndValidity();
		this.formSubmitHandler = false;
	}

	getData () {
		this.addComponent(this.formFields);
		this.genericHttp.getFormData(`lead/get-details/${ this.pageId }`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {
					this.pageData = response.data;
					let actionVal!: number | null;
					switch (this.pageData.status.value) {
						case ('PENDING'): {
							actionVal = null;
							break;
						}

						case ('MARKED_AS_CALLED'): {
							actionVal = 1;
							break;
						}

						case ('REJECTED'): {
							actionVal = 0;
							break;
						}
					}

					this.form.patchValue({
						action: actionVal,
						status: this.pageData.status.value,
						comments: this.pageData.comments.value,
						rejectionReasonId: (this.pageData.rejection_reason_id.value == null || this.pageData.rejection_reason_id.value == '') ? null : this.pageData.rejection_reason_id.value
					});



				} else {
					this.toastr.error("Details Not Found", `Failed`);
				}
			},
			error: (err: Error) => {
				// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
				this.toastr.error(err.message, `Error`);
				// this.router.navigate(["/dashboard"]);
				this.modalResponse.emit({
					status: 500,
					message: "Something Went Wrong"
				});
			},
			complete: () => {
				// console.log('completed');

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
				if (this.form.get('comments')?.value != null) {

					this.markAsCalledSubmit();
				}

				if (this.form.get('rejectionReasonId')?.value != null) {
					this.rejectSubmit();
				}
			}
		}

	}

	getCheckboxValue (event: boolean) {
		console.log(event);
		if (event) {
			this.form.patchValue({
				status: "MARKED_AS_CALLED"
			});
		} else {
			this.form.patchValue({
				status: null
			});
		}

	}

	markAsCalledSubmit () {
		const formObjectData: any = {};

		formObjectData['comments'] = this.form.get('comments')?.value;

		this.genericHttp.storeObjectDataByPatchMethod(formObjectData, `lead/marked-as-called/${ this.pageId }`).subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.success == true) {
					this.toastr.success(`Data Updated Successfully`, `Success`);
					this.modalService.dismissAll();
					this.actionResponse.emit(true);
				} else {
					alert('Error');

				}
			},
			error: (err: any) => {
				if (err.error.status == 422) {
					this.toastr.error('Someting Went Wrong', `Error`);
				} else {
					this.toastr.error(err.error, `Error`);
				}
			},
			complete: () => {
				// console.log('completed');
			}
		});
	}

	rejectSubmit () {
		const formObjectData: any = {};

		formObjectData['rejectionReasonId'] = this.form.get('rejectionReasonId')?.value;

		this.genericHttp.storeObjectDataByPatchMethod(formObjectData, `lead/rejected/${ this.pageId }`).subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.success == true) {
					this.toastr.success(`Data Updated Successfully`, `Success`);
					this.modalService.dismissAll();
					this.actionResponse.emit(true);
				} else {
					alert('Error');

				}
			},
			error: (err: any) => {
				if (err.error.status == 422) {
					this.toastr.error('Someting Went Wrong', `Error`);
				} else {
					this.toastr.error(err.error, `Error`);
				}
			},
			complete: () => {
				// console.log('completed');
			}
		});
	}
}
