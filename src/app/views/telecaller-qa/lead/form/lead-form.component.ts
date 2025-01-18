import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {Store} from '@ngrx/store';

export interface Obj {
	readonly: boolean,
	required: boolean,
	value: string | Array<string> | undefined;
}

@Component({
	selector: 'app-lead-form',
	templateUrl: './lead-form.component.html',
	styleUrl: './lead-form.component.scss',
	standalone: false
})
export class LeadFormComponent {
	showFormBuilder: boolean = false;
	componentData: any;
	bulkDataComponent: any;
	pageId!: any;
	backUrlParams!: any;
	backUrl = `/telecaller-qa/lead/list`;
	formEditUrl = `lead`;
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

		}

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

		this.genericHttp.editFormData(formData, event['storeUrl']).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.toastr.success(`Data Updated Successfully`, `Success`);
					this.router.navigate(["/telecaller-qa/lead/list"], {queryParams: this.backUrlParams});
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
