import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {Store} from '@ngrx/store';


@Component({
	selector: 'app-zero-day-regional-commodity-pmp-form',
	standalone: false,
	templateUrl: './zero-day-regional-commodity-pmp-form.component.html',
	styleUrl: './zero-day-regional-commodity-pmp-form.component.scss'
})
export class ZeroDayRegionalCommodityPmpFormComponent {

	showFormBuilder: boolean = false;
	componentData: any;
	bulkDataComponent: any;
	pageId!: any;
	backUrlParams!: any;
	backUrl = ``;
	formAddUrl = `gen/zero-day-regional-commodity-pmp/create`;
	formErrorData: any = {};

	formActivity: string = "";
	constructor (private store: Store<AppState>, private genericHttp: GenericHttpService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private changeDetectorRef: ChangeDetectorRef) {
		// this.titleService.setTitle("Some title");
	}

	ngOnInit () {

		this.dynamicFormField();
		this.formActivity = "add";
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


	getBulkInsertValues (event: any) {
		let data = new FormData();
		data.append('file', event.data.file);


		this.genericHttp.bulkFormData(event.storeUrl, data).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.toastr.success(`Data Created Successfully`, `Success`);
					this.router.navigate(["/gen/zero-day-regional-commodity-pmp/list"]);
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
