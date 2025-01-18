import {ChangeDetectorRef, Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GenericHttpService} from "../../../../services/generic-http.service";
import {AppState} from "../../../../utility/store/store.reducer";
import {Store} from "@ngrx/store";

@Component({
	selector: 'app-commodity-parameter-form',
	templateUrl: './commodity-parameter-form.component.html',
	styleUrls: ['./commodity-parameter-form.component.scss'],
	standalone: false
})
export class CommodityParameterFormComponent {
	showFormBuilder: boolean = false;
	componentData: any;
	bulkDataComponent: any;
	pageId!: any;
	backUrlParams!: any;
	backUrl = `/agri/commodity-parameter/list`;
	formAddUrl = `agri/commodity-parameter/create`;
	formEditUrl = `agri/commodity-parameter`;
	formErrorData: any = {};

	formActivity: string = "";
	constructor (private store: Store<AppState>, private genericHttp: GenericHttpService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private changeDetectorRef: ChangeDetectorRef) {
		// this.titleService.setTitle("Some title");
	}

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
			this.dynamicFormField();
			this.formActivity = "add";
		}
	}
	dynamicFormField () {
		this.genericHttp.getFormData(this.formAddUrl).subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.componentData = response.data.formData;
					this.bulkDataComponent = response.data.bulkInsert;
					this.showFormBuilder = true;
				}

			},
			error: (err: any) => {
				if (err.error) {
					this.toastr.error(`${ err.error.message }`, `${ err.status } ${ err.statusText }`);
				}
			},
			complete: () => {
				// console.log("completed");
			},
		});
	}

	dynamicFormEditField () {
		this.genericHttp.getFormData(this.formEditUrl + "/" + `${ this.pageId }` + "/edit").subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.componentData = response.data.formData;
					this.bulkDataComponent = [];
					this.showFormBuilder = true;
				}
			},
			error: (err: any) => {
				if (err.error) {
					this.toastr.error(`${ err.error.message }`, `${ err.status } ${ err.statusText }`);
				}
			},
			complete: () => {
				// console.log("completed");
			},
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

		if (this.formActivity == "add") {
			this.genericHttp.storeFormData(formData, event['storeUrl']).subscribe({
				next: (response: any) => {
					if (response.status == 200 && response.success) {
						this.toastr.success(`Data Created Successfully`, `Success`);
						this.router.navigate(["/agri/commodity-parameter/list"]);
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
		} else {
			this.genericHttp.editFormData(formData, event['storeUrl']).subscribe({
				next: (response: any) => {
					if (response.status == 200 && response.success) {
						this.toastr.success(`Data Updated Successfully`, `Success`);
						this.router.navigate(["/agri/commodity-parameter/list"], {queryParams: this.backUrlParams});
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


	}

	getBulkInsertValues (event: any) {
		let data = new FormData();
		data.append('file', event.data.file);


		this.genericHttp.bulkFormData(event.storeUrl, data).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.toastr.success(`Data Created Successfully`, `Success`);
					this.router.navigate(["/agri/commodity-parameter/list"]);
				} else {
					alert('error');
				}
			},
			error: (err: any) => {

				if (err.error.status == 422) {
					// alert('dd')
					this.showFormBuilder = false;
					this.bulkDataComponent = [];
					// this.toastr.error(`Something went wrong, Please contact to administrator`, `${response.status}`);
					this.toastr.error(`${ err.error.message }`, `Failed`);
					this.bulkDataComponent = err.error.data.bulkInsert;
					this.changeDetectorRef.detectChanges();
					if (this.bulkDataComponent.length > 0) {
						this.changeDetectorRef.detectChanges();
						this.showFormBuilder = true;
					} else {
						this.changeDetectorRef.detectChanges();
						this.showFormBuilder = true;
					}
				}
			},
			complete: () => {
				// console.log("completed");
			},
		});
	}
}
