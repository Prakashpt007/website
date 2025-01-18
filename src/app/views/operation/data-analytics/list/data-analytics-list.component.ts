import {ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {GenericHttpService} from "../../../../services/generic-http.service";
import {GenericFunctionService} from "../../../../services/generic-function.service";


const SI_SYMBOL = ['', 'K', 'Mn', 'Bn', 'T', 'Q'];

@Component({
	selector: 'app-data-analytics-list',
	templateUrl: './data-analytics-list.component.html',
	styleUrls: ['./data-analytics-list.component.scss'],
	standalone: false
})
export class DataAnalyticsListComponent {

	@ViewChild("analysisModel") analysisModel!: ElementRef;
	operationalData: Array<any> = [];

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

	editUrl: string = "";
	listUrl: string = "assets/jsons/regional-operations.json";

	//------------------------// filter variables //------------------------//
	filterPanel: boolean = false;
	filterComponentData: Array<any> = [];
	filterObject: any = {};
	filterSts: boolean = false;
	//------------------------// End //------------------------//

	constructor (
		private genericHttp: GenericHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		private changeDetectorRef: ChangeDetectorRef,
		private genFunService: GenericFunctionService,
		private modalService: NgbModal
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

		this.router.navigate(["/operations/region/list"], {queryParams: params});
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
					// this.router.navigate(["/geo/continent/list"]);

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

	viewAnalysis () {

		this.getOperationalData();
		this.modalService.open(this.analysisModel, {size: 'xl', scrollable: true, centered: true, backdrop: 'static'}).result.then(

			// {
			//     size: 'md',
			//     scrollable: true,
			//     centered: true,
			//     backdrop: 'static' //  backdrop: true //  backdrop: false
			// }
			(result) => {
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
}
