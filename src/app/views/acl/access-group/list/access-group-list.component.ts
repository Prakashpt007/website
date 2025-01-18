import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GenericFunctionService} from '../../../../services/generic-function.service';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {FilterbuilderComponent} from '../../../../utility/filterbuilder/filterbuilder.component';

@Component({
	selector: 'app-access-group-list',
	templateUrl: './access-group-list.component.html',
	styleUrls: ['./access-group-list.component.scss'],
	standalone: false
})
export class AccessGroupListComponent {
	currentIndex = 1;
	page = 1;
	orderBy: string = '';
	order: string = '';
	count = 0;
	pageSize = 20;
	pageSizes = [10, 20, 30, 50, 100];
	totalPages!: number;
	showListBuilder: boolean = false;
	errorInListApi: boolean = false;
	componentListData: any;
	listTableData: Array<any> = [];


	isSearchNameAvailable: boolean = false;
	searchNameForm!: FormGroup;
	searchNameFormSubmitHandler = false;
	@ViewChild(FilterbuilderComponent) filterbuilder: any;

	editUrl: string = "/acl/access-group/form";
	listUrl: string = "activity-group";

	//------------------------// filter variables //------------------------//
	filterPanel: boolean = false;
	filterComponentData: Array<any> = [];
	filterObject: any = {};
	filterSts: boolean = false;
	//------------------------// End //------------------------//

	constructor (
		public formBuilder: FormBuilder,
		private genericHttp: GenericHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		private changeDetectorRef: ChangeDetectorRef,
		private genFunService: GenericFunctionService
	) { }

	ngOnInit (): void {
		this.route.queryParams.subscribe((params) => {
			for (const key of Object.keys(params)) {
				// Check if the key is not one of the excluded keys
				if (key !== "page" && key !== "size" && key !== "orderBy" && key !== "order") {
					this.filterObject[key] = params[key];
				}
			}
		});

		this.searchNameForm = this.formBuilder.group({
			searchName: ["", [Validators.minLength(3), Validators.maxLength(20)]],
		});

		this.setPageLoadParam();
		this.getData();
	}

	getRequestParams (page: number, pageSize: number, filterParams: object): any {
		let params: any = {};

		if (page) {
			params[`page`] = page;
		}

		if (pageSize) {
			params[`size`] = pageSize;
		}

		if (this.orderBy) {
			params[`orderBy`] = this.orderBy;
		}
		if (this.order) {
			params[`order`] = this.order;
		}
		// Dynamic filter params
		for (const [key, value] of Object.entries(filterParams)) {

			if (value) {
				params[key] = value;
			}
		}
		// end

		return params;
	}

	setPageLoadParam () {
		// let pageParam = this.route.snapshot.paramMap;
		this.route.queryParams.subscribe((params) => {
			this.page = params["page"] != undefined ? params["page"] : this.page;
			this.pageSize = params["size"] != undefined ? params["size"] : this.pageSize;
			this.orderBy = params["orderBy"] != undefined ? params["orderBy"] : this.orderBy;
			this.order = params["order"] != undefined ? params["order"] : this.order;

			// Dynamic filter params
			for (const key of Object.keys(params)) {
				if (this.filterObject.hasOwnProperty(key)) {
					this.filterObject[key] = params[key];
				}
			}
			// end
		});
	}

	getFormValuesFromParams (params: any) {
		for (const key of Object.keys(params)) {
			if (this.filterObject.hasOwnProperty(key)) {
				this.filterObject[key] = params[key];
			}
		}
	}

	async getData () {
		// Get Request Params
		const params = this.getRequestParams(
			Number(this.page),
			Number(this.pageSize),
			this.filterObject
		);

		this.router.navigate(["/acl/access-group/list"], {queryParams: params});
		this.listTableData = [];
		this.showListBuilder = false;
		// List Data
		this.genericHttp.getDataList(this.listUrl, params).subscribe(
			(response) => {
				if (response.status == 200 || response.status == true) {
					this.componentListData = response;
					this.componentListData.data['orderBy'] = this.orderBy == '' ? 'id' : this.orderBy;
					this.componentListData.data['order'] = this.order == '' ? 'desc' : this.order;
					this.count = this.componentListData["data"]["pagination"]["totalElements"];
					this.listTableData = this.componentListData["data"]["rows"];
					// this.componentListData["data"]["filters"][2].type = 'multiselect';
					this.filterComponentData = this.componentListData["data"]["filters"];
					this.isSearchNameAvailable = this.componentListData["data"]["filters"].some((obj: {name: string;}) => obj.name === "name");


					this.showListBuilder = true;

					// Update Filter values
					this.filterComponentData = this.genFunService.updateFilterComponentData(
						params,
						this.filterComponentData.length > 0 ? this.filterComponentData : []
					);
					this.filterSts = true;
					this.searchNameForm.patchValue({
						searchName: this.filterObject['name']
					});
					this.changeDetectorRef.detectChanges();
					//End

				} else {
					this.toastr.error(`${ response.message }`, `${ response.error_code }`);
				}
			},
			(err) => {
				this.errorInListApi = true;
				if (err.status == 404) {
					this.toastr.error(`${ err.statusText }`, `${ err.status }`);
				} else {
					this.toastr.error(`${ err.message }`, `${ err.status }`);
				}
			}
		);
		// End
	}

	get f (): {[key: string]: AbstractControl;} {
		return this.searchNameForm.controls;
	}

	searchFormSubmit () {
		this.searchNameFormSubmitHandler = true;
		if (this.searchNameForm.invalid) {
			return;
		} else {
			this.filterObject['name'] = this.searchNameForm.get('searchName')?.value;
			this.getData();
			this.changeDetectorRef.detectChanges();
		}
	}
	clearSearch (event: any) {
		if (event.target.value == null || event.target.value.length == 0) {
			this.filterbuilder.resetFilter();
			this.filterPanel = false;
		}
	}

	handlePageChange (event: number): void {
		this.page = Number(event);
		this.getData();
	}

	handlePageSizeChange (event: any): void {
		this.pageSize = Number(event.target.value);
		this.page = 1;
		this.getData();
	}

	resetFilter () {
		this.filterComponentData.forEach((item) => {
			if (item.type === "multiselect") {
				item.values = [];
			} else if (item.type === "select") {
				item.values = null;
			} else {
				item.values = "";
			}
		});
		this.filterObject = {};

		this.getData();

		this.filterPanel = !this.filterPanel;
		this.searchNameForm.patchValue({
			searchName: null
		});
		this.filterSts = false;
		this.changeDetectorRef.detectChanges();
	}

	onSelectionChange (selectedValues: any) {
		console.log(selectedValues);
	}

	toggleFilter () {
		this.filterPanel = !this.filterPanel;
	}

	getFormValuesFromBuilder (filterValue: any) {
		this.filterObject = filterValue;

		for (const key of Object.keys(filterValue)) {
			if (this.filterObject.hasOwnProperty(key)) {
				this.filterObject[key] = this.multipleValuesSet(filterValue[key]);
			}
		}
		this.page = 1;
		this.getData();
	}

	multipleValuesSet (valueToBeSet: any) {
		let returnValue: any;
		if (Array.isArray(valueToBeSet)) {
			returnValue = valueToBeSet.join(',');
		} else {
			returnValue = valueToBeSet;
		}
		return returnValue;
	}

	toggleFilterValue (event: any) {
		this.filterPanel = !event;
	}
	componentActionRequest (event: any) {

		this.genericHttp.actionRequest(event).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.toastr.success(`Data Updated Successfully`, `Success`);
					// this.router.navigate(["/geo/country/list"]);

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
				this.getData();
			},
		});
	}

	fieldsOrder (event: any) {
		this.orderBy = event.orderBy;
		this.order = event.order;
		this.getData();
	}

	checkObjectHasValueOrNot (obj: any) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key) && obj[key] !== null) {
				return true;
			}
		}
		return false;
	}
}
