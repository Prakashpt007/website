import {animate, style, transition, trigger} from "@angular/animations";
import {Component, ElementRef, ViewChild, } from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators, } from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {GenericHttpService} from "../../../../services/generic-http.service";
import {AppState} from "../../../../utility/store/store.reducer";

@Component({
	selector: 'app-harvested-geo-tag-form',
	templateUrl: './harvested-geo-tag-form.component.html',
	styleUrl: './harvested-geo-tag-form.component.scss',
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
export class HarvestedGeoTagFormComponent {
	@ViewChild("rejectModal") rejectModal!: ElementRef;
	@ViewChild("approveModal") approveModal!: ElementRef;

	rejectionReason!: any[];
	rejectionReasonList!: any[];

	rejectionForm!: FormGroup;
	formSubmitHandler = false;

	pageId!: any;
	position!: any;

	mapStatus: string | undefined;

	backUrlParams!: any;

	constructor (
		private store: Store<AppState>,
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private genericHttp: GenericHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private modalService: NgbModal
	) {
		// Form Build
		this.rejectionForm = this.formBuilder.group({
			rejectReason: ["", Validators.required],
		});
	}

	ngOnInit (): void {
		if (this.route.snapshot.paramMap.get("id") != null) {
			this.pageId = Number(`${ this.route.snapshot.paramMap.get("id") }`);
			this.getRejectionReasonDList(1);
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
		return this.rejectionForm.controls;
	}

	getData (caseID: string) {

		this.genericHttp.getFormData(`${ caseID }/geo-tag-validation/get-details`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {

					this.position = {
						"lat": Number(response.data.latitude),
						"lng": Number(response.data.longitude)
					};

					if (response.data.status == 'VALIDATION_FAILED') {
						this.rejectionForm.patchValue({
							"rejectReason": response.data.rejectionReasonId == null ? '' : response.data.rejectionReasonId
						});
						this.rejectionForm.get('rejectReason')?.disable();
						this.mapStatus = 'VALIDATION_FAILED';

					} if (response.data.status == 'VALIDATION_DONE') {
						this.rejectionForm.get('rejectReason')?.disable();
						this.mapStatus = 'VALIDATION_DONE';
					}
					else {
						this.rejectionForm.patchValue({
							"rejectReason": response.data.rejectionReasonId == null ? '' : response.data.rejectionReasonId
						});
						this.mapStatus = response.data.status;
					}

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

	getRejectionReasonDList (rejectionReasonTypeId: number) {
		this.genericHttp.getRejectionReasonDList(rejectionReasonTypeId).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.rejectionReasonList = response.data;
				} else {
					this.rejectionReasonList = [];
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


	reject (requestId: any, reason: any) {
		this.modalService.open(this.rejectModal).result.then(
			(result) => {
				const data = {
					"rejectionReasonId": reason
				};
				this.genericHttp.rejectDoc(`${ requestId }/geo-tag-validation/reject`, data).subscribe({
					next: (response: any) => {
						if (response.status == '200' || response.success) {
							this.toastr.success("Rejected Successfully", "Success");
							this.router.navigate(["/geo-qa/harvested-geo-tag/list"]);
						} else {
							this.toastr.error("Someting Went Wrong", "Error");
						}
					},
					error: (err: any) => {
						if (err.error.status == 422) {
							this.toastr.error(err.error.message, `Error`);
						} else {
							this.toastr.error(err.error, `Error`);
						}
					},
					complete: () => {
						// console.log('completed');
					}
				});

			},
			(reason) => {
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
				//------------------------------- Reject Doc Cancel Here -------------------------------//
			}
		);
	}

	approve (requestId: any) {
		this.modalService.open(this.approveModal).result.then(
			(result) => {

				this.genericHttp.approvedDoc(`${ requestId }/geo-tag-validation/approve`).subscribe({
					next: (response: any) => {
						if (response.status == '200' || response.success) {
							this.toastr.success("Approved Successfully", "Success");
							this.router.navigate(["/geo-qa/harvested-geo-tag/list"]);
						} else {
							this.toastr.error("Someting Went Wrong", "Error");
						}
					},
					error: (err: any) => {
						if (err.error.status == 422) {
							this.toastr.error(err.error.message, `Error`);
						} else {
							this.toastr.error(err.error, `Error`);
						}
					},
					complete: () => {
						// console.log('completed');
					}
				});
			},
			(reason) => {
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
				//------------------------------- Reject Doc Cancel Here -------------------------------//
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
