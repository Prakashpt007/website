import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {Store} from '@ngrx/store';

@Component({
	selector: 'app-employee-details',
	templateUrl: './employee-details.component.html',
	styleUrls: ['./employee-details.component.scss'],
	standalone: false
})
export class EmployeeDetailsComponent {
	@ViewChild("thumbnailModal") thumbnailModal!: ElementRef;
	thumbnailModalSrc!: string;
	userImageThumbnail: boolean = false;

	background: ThemePalette = "primary";

	userDetails: any = undefined;
	userBankDetails: any = undefined;

	showFormBuilder: boolean = false;
	componentData: any;
	bulkDataComponent: any;
	pageId!: any;
	backUrlParams!: any;
	backUrl = `/hr-department/employee/list`;
	userDetailsUrl = `user-details`;
	bankDetailsUrl = `user-bank-details`;
	empDetailsUrl = `employee-details`;
	formErrorData: any = {};

	formActivity: string = "";

	constructor (private store: Store<AppState>, private genericHttp: GenericHttpService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit () {

		if (this.route.snapshot.paramMap.get("id") != null) {
			this.pageId = Number(`${ this.route.snapshot.paramMap.get("id") }`);
			this.dynamicFormEditField();
			this.formActivity = "edit";
			this.store.select('store').subscribe({
				next: (response) => {
					this.backUrlParams = response.backUrl;
				}
			});
		} else {

			this.formActivity = "add";
		}
	}

	tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
		let tabIndex = tabChangeEvent.index;
		if (tabIndex == 0) {
			// this.dynamicFormEditField();
		} else if (tabIndex == 1) {
			if (this.userBankDetails == undefined) {
				this.getBankDetails(this.pageId);
			}
		} else if (tabIndex == 2) {
			if (this.componentData == undefined) {
				this.getEmpDetails(this.pageId);
			}
		} else {
			console.log('nothing');

		}


	};
	getBankDetails (requestId: any) {
		this.userBankDetails = undefined;
		this.genericHttp.getFormData(this.bankDetailsUrl + "/" + `${ requestId }`).subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.userBankDetails = response.data;
				}
			},
			error: (err: any) => {
				console.log(err);
			},
			complete: () => {
				// console.log("completed");
			}
		});
	}

	getEmpDetails (requestId: any) {
		this.componentData = undefined;
		this.showFormBuilder = false;
		this.genericHttp.getFormData(this.empDetailsUrl + "/" + `${ requestId }`).subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.componentData = response.data.formData;
					this.showFormBuilder = true;
				}
			},
			error: (err: any) => {
				console.log(err);
			},
			complete: () => {
				// console.log("completed");
			}
		});
	}

	dynamicFormEditField () {
		this.userDetails = undefined;
		this.genericHttp.getFormData(this.userDetailsUrl + "/" + `${ this.pageId }`).subscribe({
			// this.genericHttp.getDummyData(this.userDetailsUrl).subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.userDetails = response.data;
					if (this.userDetails.photo.length == 0) {
						this.userDetails['photo'] = 'assets/images/user.jpg';
						this.userImageThumbnail = false;
					} else {
						this.userImageThumbnail = true;
					}
				}
			},
			error: (err: any) => {
				console.log(err);
			},
			complete: () => {
				// console.log("completed");
			}
		});
	}

	getFormValuesFromBuilder (event: any) {
		let dataObject = event.data;
		const formData = new FormData();
		// Loop through the properties of the dataObject and append them to FormData
		for (const key in dataObject) {
			if (dataObject.hasOwnProperty(key)) {
				formData.append(key, dataObject[key]);
			}
		}


		this.genericHttp.editFormData(formData, event['storeUrl']).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.toastr.success(`Data Updated Successfully`, `Success`);
					this.router.navigate(["/hr-department/employee/list"], {queryParams: this.backUrlParams});
				} else {
					alert('Error');
				}
			},
			error: (err: any) => {
				if (err.error.status) {
					this.formErrorData = err.error.data.formData.errors;
					this.changeDetectorRef.detectChanges();
				}
			},
			complete: () => {
				// console.log("completed");
			},
		});

	}
	checkValueExitsOrNot (value: any) {
		if (value.length > 0) {
			return value;
		} else if (value != null && typeof (value) == 'number') {
			return value;
		} else {
			return `<span class="badge bg-secondary">Null</span>`;
		}

	}


	thumbnailViewEvent (thumbnailUrl: string) {
		this.thumbnailModalSrc = thumbnailUrl;
		this.modalService.open(this.thumbnailModal, {size: 'xl', scrollable: true, centered: true}).result.then(
			(result) => {
				console.log(`Closed with: ${ result }`);
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
