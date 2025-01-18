import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Observable, Subject} from 'rxjs';
import {GenericFunctionService} from '../../../../services/generic-function.service';
import {GenericHttpService} from '../../../../services/generic-http.service';

@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.scss'],
	standalone: false
})
export class EmployeeListComponent {
	searchForm!: FormGroup;
	formSubmitHandler = false;

	@ViewChild("searchModel") searchModel!: ElementRef;
	searchResult!: any;
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

	editUrl: string = "/hr-department/employee/details";
	listUrl: string = "user-employee-data";

	//------------------------// filter variables //------------------------//
	filterPanel: boolean = false;
	filterComponentData: Array<any> = [];
	filterObject: any = {};
	filterSts: boolean = false;
	//------------------------// End //------------------------//

	constructor (
		private genericHttp: GenericHttpService,
		private router: Router,
		public formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		private changeDetectorRef: ChangeDetectorRef,
		private genFunService: GenericFunctionService,
		private modalService: NgbModal
	) { }

	ngOnInit (): void {


		this.searchForm = this.formBuilder.group({
			searchByMobile: [
				"",
				[
					Validators.pattern(/^[0-9]\d*$/),
					Validators.minLength(10),
					Validators.maxLength(10)
				],
			],
			searchByName: [
				"",
				[
					Validators.minLength(3),
					Validators.maxLength(15)
				],
			]
		});
		this.route.queryParams.subscribe((params) => {
			for (const key of Object.keys(params)) {
				// Check if the key is not one of the excluded keys
				if (key !== "page" && key !== "size" && key !== "orderBy" && key !== "order") {
					this.filterObject[key] = params[key];
				}
			}
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

		this.router.navigate(["/hr-department/employee/list"], {queryParams: params});
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
					this.showListBuilder = true;

					// Update Filter values
					this.filterComponentData = this.genFunService.updateFilterComponentData(
						params,
						this.filterComponentData.length > 0 ? this.filterComponentData : []
					);
					this.filterSts = true;
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

	searchModelEvent () {
		this.modalService.open(this.searchModel, {size: 'xl', scrollable: true, centered: true, backdrop: 'static'}).result.then(
			(result) => {

			},
			(reason) => {
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
			}
		);
	}


	private getDismissReason (reason: any): string {
		this.searchResult = null;
		if (reason === ModalDismissReasons.ESC) {
			this.searchForm.reset();
			return "by pressing ESC";
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			this.searchForm.reset();
			return "by clicking on a backdrop";
		} else {
			this.searchForm.reset();
			return `with: ${ reason }`;
		}


	}


	get f (): {[key: string]: AbstractControl;} {
		return this.searchForm.controls;
	}

	searchFormSubmit () {
		this.formSubmitHandler = true;
		if (this.searchForm.invalid) {
			return;
		} else {
			this.searchResult = null;
			const searchName: any = this.searchForm.get('searchByName')?.value;
			const searchMobile = this.searchForm.get('searchByMobile')?.value;

			let searchUrl: string = '';

			if (this.searchForm.value.searchByName == "") {
				searchUrl = `users/search?searchByMobile=${ searchMobile }`;
			}

			if (this.searchForm.value.searchByMobile == "") {
				searchUrl = `users/search?searchByName=${ searchName }`;
			}


			if (searchUrl.length > 0) {
				this.getSearchResult(searchUrl).subscribe({
					next: (response) => {
						this.searchResult = response;
					},
					error: (err: any) => {
						this.toastr.error(err.error.message, `Error`);
					}
				});
			}
		}

	}

	getSearchResult (dataUrl: string) {
		const searchResultSubject: Subject<any> = new Subject<any>();
		const searchResult$: Observable<any> = searchResultSubject.asObservable();

		this.genericHttp.searchData(dataUrl).subscribe({
			// this.genericHttp.searchDummyData('assets/jsons/emp-search.json', data).subscribe({
			next: (response) => {
				searchResultSubject.next(response.data); // Emit the searchResult value
				searchResultSubject.complete(); // Complete the Observable

			},
			error: (err: any) => {
				this.toastr.error(err.error.message, `Error`);
				searchResultSubject.error(err); // Pass the error to the Observable
			},
			complete: () => {
				// console.log("completed");

			},
		});

		return searchResult$;
	}

	searchTabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
		let tabIndex = tabChangeEvent.index;
		this.searchResult = null;
		if (tabIndex == 0) {
			// this.searchForm.get('searchByName')?.reset();
			this.searchForm.patchValue({
				searchByName: ""
			});

		} else if (tabIndex == 1) {
			// this.searchForm.get('searchByMobile')?.reset();

			this.searchForm.patchValue({
				searchByMobile: ""
			});
		} else {
			this.searchForm.reset();
		}
	};
}
