import {ChangeDetectorRef, Component, signal} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {Store} from '@ngrx/store';

@Component({
	selector: 'app-active-form',
	standalone: false,
	templateUrl: './active-form.component.html',
	styleUrl: './active-form.component.scss'
})
export class ActiveFormComponent {
	showPageData = signal(false);
	showFormBuilder = signal(false);
	componentData: any;
	pageData: any;
	pageId!: any;
	backUrlParams!: any;
	backUrl = `/eway/active/list`;
	formEditUrl = `eway-bill-doc/active`;
	getFormDetailsUrl = `eway-bill-doc/active/vehicle-file-upload`;
	formErrorData: any = {};
	formActivity: string = "";

	constructor (private store: Store<AppState>, private genericHttp: GenericHttpService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private changeDetectorRef: ChangeDetectorRef) {
		// this.titleService.setTitle("Some title");
	}

	ngOnInit () {

		if (this.route.snapshot.paramMap.get("id") != null) {
			this.pageId = Number(`${ this.route.snapshot.paramMap.get("id") }`);
			this.getDynamicFormDetails();
			this.getFormData();
			this.formActivity = "edit";

			this.store.select('store').subscribe({
				next: (response) => {
					this.backUrlParams = response.backUrl;
				}
			});

		}
	}

	getDynamicFormDetails () {
		this.genericHttp.getFormData(this.formEditUrl + "/" + `${ this.pageId }` + "/edit").subscribe({
			next: (response: any) => {
				if ((response.status == 200)) {
					this.pageData = response.data;
					console.log(this.pageData);

					this.pageData['myname'] = {
						"Name": "Prakash Patil",
						"Address": "123 Main Street",
						"City": "New York",
						"State": "NY",
						"Zip": "10001"
					};



				} else {
					// alert('Error')
					this.toastr.error(`Please contact administrator for more information`, `Error`);
				}
			},
			error: (err: any) => {
				if (err.error.status) {
					this.changeDetectorRef.detectChanges();
					console.log(err);
				}
			},
			complete: () => {
				// console.log("completed");
				this.showPageData.set(true);
			},
		});
	}


	getFormData () {
		this.genericHttp.getFormData(this.getFormDetailsUrl + "/" + `${ this.pageId }`).subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.componentData = response.data.formData;
				}
			},
			error: (err: any) => {
				if (err.error) {
					this.toastr.error(`${ err.error.message }`, `${ err.status } ${ err.statusText }`);
				}
			},
			complete: () => {
				// console.log("completed");
				if (this.componentData.fields.length > 0) {
					this.showFormBuilder.set(true);
				}
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

		console.log(formData);

		this.genericHttp.editFormData(formData, event['storeUrl']).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.toastr.success(`Data Updated Successfully`, `Success`);
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
	objectKeys = Object.keys;

	isObject (value: any): boolean {
		return value && typeof value === 'object' && !Array.isArray(value);
	}

	isArray (value: any): boolean {
		return Array.isArray(value);
	}

	getNonArrayKeys (data: any): string[] {
		return this.objectKeys(data).filter(key => !this.isArray(data[key]));
	}

	getArrayKeys (data: any): string[] {
		return this.objectKeys(data).filter(key => this.isArray(data[key]));
	}
}
