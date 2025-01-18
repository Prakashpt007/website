import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../services/generic-http.service';


const SI_SYMBOL = ['', 'K', 'Mn', 'Bn', 'T', 'Q'];


@Component({
	selector: 'app-region',
	templateUrl: './region.component.html',
	styleUrls: ['./region.component.scss'],
	standalone: false
})
export class RegionComponent {

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

	operationalData: Array<any> = [];
	filterDlList: any = [];

	regionDlList: any = [];

	listUrl: string = "assets/jsons/regional-operations.json";
	editUrl: string = "";

	//------------------------// filter variables //------------------------//
	filterPanel: boolean = false;
	filterComponentData: Array<any> = [];
	filterObject: any = {
		filter: null,
		region: null,
	};
	//------------------------// End //------------------------//

	constructor (
		private genericHttp: GenericHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		private changeDetectorRef: ChangeDetectorRef
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

		this.setPageLoadParam();
		this.getData();
		this.getRegionsDLList();
		this.getFilterDLList();
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


	getRegionsDLList () {
		this.genericHttp.getDummyDList('assets/jsons/regions.json').subscribe(
			(response) => {
				if (response.status == 200 || response.status == true) {
					this.regionDlList = response.data;

				} else {
					this.toastr.error(`${ response.message }`, `${ response.error_code }`);
				}

			},
			(err) => {
				if (err.status == 404) {
					this.toastr.error(`${ err.statusText }`, `${ err.status }`);
				} else {
					this.toastr.error(`${ err.message }`, `${ err.status }`);
				}
			}
		);
	}

	getFilterDLList () {

		this.genericHttp.getDummyDList('assets/jsons/filter.json').subscribe(
			(response) => {
				if (response.status == 200 || response.status == true) {
					this.filterDlList = response.data;

				} else {
					this.toastr.error(`${ response.message }`, `${ response.error_code }`);
				}

			},
			(err) => {
				if (err.status == 404) {
					this.toastr.error(`${ err.statusText }`, `${ err.status }`);
				} else {
					this.toastr.error(`${ err.message }`, `${ err.status }`);
				}
			}
		);
	}
	async getData () {
		this.operationalData = [];
		this.listTableData = [];

		// Get Request Params
		const params = this.getRequestParams(
			Number(this.page),
			Number(this.pageSize),
			this.filterObject
		);

		console.log(this.filterObject);


		this.router.navigate(["/operations/region"], {queryParams: params});

		this.listTableData = [];
		this.showListBuilder = false;

		// List Data
		this.genericHttp.getDummyList(this.listUrl, params).subscribe(
			(response) => {
				if (response.status == 200 || response.status == true) {
					this.componentListData = response;
					this.componentListData.data['orderBy'] = this.orderBy == '' ? 'id' : this.orderBy;
					this.componentListData.data['order'] = this.order == '' ? 'desc' : this.order;
					this.count = this.componentListData["data"]["pagination"]["totalElements"];
					this.listTableData = this.componentListData["data"]["rows"];
					this.filterComponentData = this.componentListData["data"]["filters"];
					this.showListBuilder = true;

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
		this.getOperationalData();
	}

	filterChange (event: any) {
		this.filterObject['filter'] = Number(event.target.value);
		this.getData();
	}

	regionChange (event: any) {
		this.filterObject['region'] = Number(event.target.value);
		console.log(event);

		this.getData();
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

	ngAfterViewInit () {
	}

	convertedValue (value: any, type: string) {
		switch (type) {
			case "number": {
				return this.abbreviateNumber(value);
			}

			case "ton": {
				return this.formatNumber(Number(value)) + " Tons";
			}

			case "localNumber": {
				return this.formatNumber(Number(value));
			}
			case "currency": {
				return this.numDifferentiation(value);
			}

			default: {
				return value;
			}
		}
	}


	fieldsOrder (event: any) {
		this.orderBy = event.orderBy;
		this.order = event.order;
		this.getData();
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
	numDifferentiation (value: number) {
		const val = Math.abs(value);
		if (val >= 10000000) return `${ (value / 10000000).toFixed(2) } Cr`;
		if (val >= 100000) return `${ (value / 100000).toFixed(2) } Lac`;
		if (val >= 10000) return `${ this.abbreviateNumber(value) }`;
		return value;
	}

	formatNumber = (num: number) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	abbreviateNumber (number: number) {
		// what tier? (determines SI symbol)
		var tier = (Math.log10(Math.abs(number)) / 3) | 0;

		// if zero, we don't need a suffix
		if (tier == 0) return number;

		// get suffix and determine scale
		var suffix = SI_SYMBOL[tier];
		var scale = Math.pow(10, tier * 3);

		// scale the number
		var scaled = number / scale;

		// format number and add suffix

		return Number(scaled.toFixed(3)) + suffix;
	}


	getOperationalData () {
		this.operationalData = [
			{
				name: "Total Lead",
				value: "123456",
				type: "number",
				icon: "fa-solid fa-users"
			},
			{
				name: "Total Visit",
				value: "18045",
				type: "number",
				icon: "fa-solid fa-person-walking-arrow-right"
			},
			{
				name: "Total Rights",
				value: "1075",
				type: "number",
				icon: "fa-solid fa-handshake"
			},
			{
				name: "Total Volume",
				value: "12346",
				type: "ton",
				icon: "fa-solid fa-plate-wheat"
			},
			{
				name: "Total Value",
				value: "992263",
				type: "currency",
				icon: "fa-solid fa-indian-rupee-sign"
			},
			{
				name: "Total Delivery",
				value: "7044020",
				type: "localNumber",
				icon: "fa-solid fa-truck-fast"
			}
		];
	}

}
