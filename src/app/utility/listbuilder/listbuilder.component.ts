import {CommonModule} from "@angular/common";
import {Component, Input, Output, ElementRef, ViewChild, EventEmitter, ChangeDetectorRef} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {RouterModule, ActivatedRoute, Router} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from '@angular/material/badge';
import {ShowNewComponent} from "../show-new/show-new.component";
import {ShowEmptyComponent} from "../show-empty/show-empty.component";
import {IndeterminateDirective} from "../directives/indeterminate.directive";
import {TrimSpacesPipe} from "../pipes/trim-spaces.pipe";
import {FormatTextPipe} from "../pipes/format-text.pipe";
import {TrimSpacesBetweenPipe} from "../pipes/trim-spaces-between.pipe";
import {ExtractFileExtensionPipe} from "../pipes/extract-file-extension.pipe";
import {GenericHttpService} from "../../services/generic-http.service";
import {KmlMapComponent} from "../kml-map/kml-map.component";
import {AppState, addToClickInfo, setBackUrl} from "../store/store.reducer";
import {Store} from "@ngrx/store";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {IndianCurrencyPipe} from "../pipes/indian-currency.pipe";

@Component({
	selector: "app-listbuilder",
	templateUrl: "./listbuilder.component.html",
	styleUrls: ["./listbuilder.component.scss"],
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgxPaginationModule, ShowNewComponent, ShowEmptyComponent, KmlMapComponent, ExtractFileExtensionPipe, TrimSpacesBetweenPipe, MatCheckboxModule, MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule, FormatTextPipe, IndianCurrencyPipe],
})
export class ListbuilderComponent {

	@Input() componentListData!: any;
	@Input() filterComponentData!: any;
	@Input() editUrl!: any;
	@Input() viewUrl!: any;
	@Output() componentAction = new EventEmitter<any>();
	@Output() fieldsOrder = new EventEmitter<any>();
	@Output() viewonlyFlagStatus = new EventEmitter<any>();

	@ViewChild("actionModal") actionModal!: ElementRef;
	@ViewChild("rejectModal") rejectModal!: ElementRef;
	@ViewChild("approveModal") approveModal!: ElementRef;
	@ViewChild("thumbnailModal") thumbnailModal!: ElementRef;
	@ViewChild("kmlLeafletMapModal") kmlLeafletMapModal!: ElementRef;
	@ViewChild("htmlRenderModal") htmlRenderModal!: ElementRef;

	columns!: Array<any>;
	rows!: Array<any>;
	isRowDraggable: boolean = true;
	actions!: Array<any>;
	isActions: boolean = false;
	modalConfirmationMessage!: string;
	modalColorType: string = 'bg-primary';
	thumbnailModalSrc!: string;
	thumbnailModalName!: string | undefined;
	kmlCoordinates: any = [];
	kmlLocationName: string = "";
	htmlName: string = "";
	htmlCode: SafeHtml = "";

	orderBy!: string;
	order!: string;

	clickedId!: any;

	// displayString!: any;
	constructor (private sanitizer: DomSanitizer, private elementRef: ElementRef, private store: Store<AppState>, private cd: ChangeDetectorRef, public formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private modalService: NgbModal, private toastr: ToastrService, private genericHttp: GenericHttpService) {


	}
	subscription!: Subscription;
	ngOnInit () {
		this.columns = this.componentListData["data"]["columns"];


		this.rows = this.componentListData["data"]["rows"];

		this.actions = this.componentListData["data"]["actions"];
		if (this.actions.length > 0) {
			this.isActions = true;
		} else {
			this.isActions = false;
		}
		this.orderBy = this.componentListData["data"].orderBy;
		this.order = this.componentListData["data"].order;


		// Get Url Param for store backUrl object
		this.route.queryParams.subscribe(params => {
			this.store.dispatch(setBackUrl(params));
		});

	}

	ngOnDestroy () {
		this.subscription.unsubscribe();
	}

	ngAfterViewInit () {
		this.subscription = this.store.select('store').subscribe({
			next: (response) => {
				if (response.clickedInfo.url == this.router.url) {
					this.clickedId = response.clickedInfo.id;
					setTimeout(() => {
						this.removeClickedId();
					}, 10000);
				}
			}
		});

		setTimeout(() => {
			this.scrollToElement();
		}, 300);
	}

	scrollToElement () {

		setTimeout(() => {
			const element = this.elementRef.nativeElement.querySelector('.activeId');
			if (element) {
				const container = this.elementRef.nativeElement.querySelector('.table-responsive-xxl'); // Replace 'container-class' with the class of your table container
				const containerRect = container.getBoundingClientRect();
				const elementRect = element.getBoundingClientRect();

				const scrollTop = elementRect.top - containerRect.top - (container.clientHeight - elementRect.height) / 2;

				container.scrollTo({
					top: scrollTop,
					behavior: 'smooth'
				});
			} else {
				// console.warn('Element with class .activeId not found.');
			}
		}, 300);
	}

	checkValueType (value: any): string {
		let result!: any;
		if (Array.isArray(value)) {
			result = 'array';
		} else if (typeof value === 'object' && value !== null) {
			result = 'object';
		} else {
			result = 'string';
		}
		return result;
	}

	getValidationStsIcon (key: any) {
		let result = "";
		switch (key) {
			case "bankAccountStatus":
				result = `<i class="fa-building-columns fa-solid"></i>`;
				break;
			case "caseWarehouseStatus":
				result = `<i class="fa-solid fa-warehouse"></i>`;
				break;
			case "companyStatus":
				result = `<i class="fa-regular fa-building"></i>`;
				break;
			case "farmStatus":
				result = `<i class="fa-solid fa-file-invoice"></i>`;
				break;
			case "userStatus":
				result = `<i class="fa-solid fa-user"></i>`;
				break;
			case "spotStatus":
				result = `<i class="fa-solid fa-location-dot"></i>`;
				break;
			case "kmlStatus":
				result = `<i class="fa-solid fa-map-location-dot"></i>`;
				break;
			case "schedulingStatus":
				result = `<i class="fa-regular fa-calendar-days"></i>`;
				break;
			default:
				console.log("Invalid Icon");
				break;
		}
		return result;
	}

	getValidationStsTooltip (key: any, value?: any) {
		let result = "";
		switch (key) {
			case "bankAccountStatus":
				result = `Bank Account Status (${ value?.toLowerCase().split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })`;
				break;
			case "caseWarehouseStatus":
				result = `Warehouse Status (${ value?.toLowerCase().split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })`;
				break;
			case "companyStatus":
				result = `Company Documents Status (${ value?.toLowerCase().split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })`;
				break;
			case "farmStatus":
				result = `Farm/Land Documents Status (${ value?.toLowerCase().split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })`;
				break;
			case "userStatus":
				result = `KYC Documents Status (${ value?.toLowerCase().split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })`;
				break;
			case "spotStatus":
				result = `Warehouse Location Status (${ value?.toLowerCase().split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })`;
				break;
			case "kmlStatus":
				result = `Farm/Land Coordinates Status (${ value?.toLowerCase().split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })`;
				break;
			case "schedulingStatus":
				result = `Scheduling Status (${ value?.toLowerCase().split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })`;
				break;
			default:
				console.log("Invalid Status");
				break;
		}
		return result;
	}

	getValidationSts (value: any) {
		let sts = "";
		switch (value) {
			case "PENDING":
				sts = `text-bg-secondary`;
				break;

			case "NULL":
				sts = `text-bg-dark d-none`;
				break;

			case "VALIDATION_DONE":
				sts = `text-bg-success`;
				break;

			case "FLS_VERIFICATION_DONE":
				sts = `text-bg-success`;
				break;

			case "NOT_UPLOADED":
				sts = `text-bg-dark`;
				break;

			case "DOCUMENT_SUBMITTED":
				sts = `text-bg-secondary`;
				break;

			case "REJECTED":
				sts = `text-bg-danger`;
				break;
			default:
				console.log("Invalid Status");

				sts = `text-bg-danger`;
				break;
		}
		return sts;
	}

	formatCamelCase (input: string): string {
		// Split the input string by uppercase letters
		const words = input.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

		// Capitalize each word and join them with a space
		const formatted = words
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
		// let result = formatted == 'Id' ? 'ID' : formatted;
		// result = formatted == 'Uan' ? 'UAN' : formatted;

		let result = '';
		switch (formatted) {
			case "Id":
				result = `ID`;
				break;
			case "Uan":
				result = `UAN`;
				break;
			default:
				result = formatted;
				break;
		}
		return result;
	}

	getAbbreviation (text: any) {
		if (window.innerWidth < 576) {
			return text.length > 18 ? text.substring(0, 18) + '...' : text;
		} else {
			return text;
		}

	}

	getWidthByName (input: string) {
		let styl = {};
		if (input.split(' ').length > 2) {

			// styl = {
			// 	maxWidth: '100px',
			// 	overflow: 'hidden',
			// 	textOverflow: 'ellipsis',
			// 	textWrap: 'nowrap',
			// };
		}
		return styl;
	}

	formatUnderscoreCase (input: string): string {
		// Split the input string by uppercase letters
		const words = input.replace(/([a-z])([A-Z])/g, "$1 $2").split("_");

		// Capitalize each word and join them with a space
		const formatted = words
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" ");

		return formatted;
	}


	thumbnailViewEvent (thumbnailUrl: string, name?: string) {
		this.thumbnailModalSrc = thumbnailUrl;
		this.thumbnailModalName = name;
		this.modalService.open(this.thumbnailModal, {size: 'xl', scrollable: true, centered: true}).result.then(
			(result) => {
				console.log(`Closed with: ${ result }`);
			},
			(reason) => {
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
			}
		);
	}

	actionEvent (requestId: any, actionName: string, actionTye: string, actionUrl: string, confirmationMessage: string) {
		this.modalConfirmationMessage = confirmationMessage;
		this.modalColorType = actionTye;
		this.modalService.open(this.actionModal, {scrollable: true, centered: true}).result.then(
			(result) => {
				console.log(`Closed with: ${ result }`);
				console.log(actionName);
				console.log(actionUrl);
				console.log(requestId);

				this.componentAction.emit({
					id: Array.isArray(requestId) ? [...requestId] : [requestId],
					actionName: actionName,
					actionUrl: actionUrl,
				});
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

	getStyle (name: String) {
		let result = '';
		switch (name) {
			case "status":
				result = `6.875rem`;
				break;
			case "id":
				result = `3.125rem`;
				break;
			default:
				result = ``;
				break;
		}
		return result;
	}

	convertToUnderscoreFormat (input: string): string {
		// Use a regular expression to find all capital letters followed by lowercase letters
		// and replace them with the lowercase letter preceded by an underscore
		return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
	}

	sortByColumn (name: string, order: string) {
		// var columnName = this.convertToUnderscoreFormat(name);
		if (this.orderBy == name) {
			if (order == 'desc') {
				this.order = 'asc';
			} else {
				this.order = 'desc';
			}
		} else {
			this.orderBy = name;
			this.order = 'desc';
		}

		this.fieldsOrder.emit({orderBy: this.orderBy, order: this.order});
	}


	kmlMap (coordinates: Array<any>, name: string) {
		this.kmlCoordinates = [];
		this.kmlLocationName = '';
		this.kmlCoordinates = coordinates;
		this.kmlLocationName = name;
		if (this.kmlCoordinates.length > 0) {
			if (this.kmlCoordinates[0] == 0 || this.kmlCoordinates[1] == 0 || this.kmlCoordinates[2] == 0 || this.kmlCoordinates[3] == 0) {
				this.toastr.warning('Incorrect Coordinates', `${ 'Warning' }`);
			} else {
				this.modalService.open(this.kmlLeafletMapModal, {size: 'xl', scrollable: true, centered: true});
			}
		}
	}

	htmlRender (code: string, name: string) {
		this.htmlName = name;
		this.htmlCode = this.sanitizer.bypassSecurityTrustHtml(code);
		this.modalService.open(this.htmlRenderModal, {size: 'xl', scrollable: true, centered: true});
	}

	checkKMLPoints (coordinates: Array<any>) {
		if (coordinates[0] == 0 || coordinates[1] == 0 || coordinates[2] == 0 || coordinates[3] == 0) {
			return true;
		} else {
			return false;
		}
	}

	checkIfItIsIconOrNot (str: any) {
		const char = '<i';
		console.log(str);

		return str.includes(char) ? true : false;
	}

	storeId (editLink: string, id: any) {
		this.store.dispatch(addToClickInfo({url: this.router.url, id: id}));
		if (Array.isArray(id)) {
			this.router.navigate([editLink, ...id]);
		} else {
			this.router.navigate([editLink, id]);
		}


	}

	storeIdForOtherBtn (id: number, viewonlyFlag?: boolean) {
		if (viewonlyFlag) {
			this.viewonlyFlagStatus.emit({
				id: id,
				viewonlyStatus: true,
			});
		}

		this.store.dispatch(addToClickInfo({url: this.router.url, id: id}));
	}

	removeClickedId () {
		this.clickedId = 0;
	}

	// pickTextColorBasedOnBgColorAdvanced (bgColor: string, lightColor: string, darkColor: string) {
	// 	var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
	// 	var r = parseInt(color.substring(0, 2), 16); // hexToR
	// 	var g = parseInt(color.substring(2, 4), 16); // hexToG
	// 	var b = parseInt(color.substring(4, 6), 16); // hexToB
	// 	var uicolors = [r / 255, g / 255, b / 255];
	// 	var c = uicolors.map((col) => {
	// 		if (col <= 0.03928) {
	// 			return col / 12.92;
	// 		}
	// 		return Math.pow((col + 0.055) / 1.055, 2.4);
	// 	});
	// 	var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
	// 	return (L > 0.179) ? darkColor : lightColor;

	// }

	pickTextColorBasedOnBgColorAdvanced (bgColor: string, lightColor: string, darkColor: string) {

		var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
		var r = parseInt(color.substring(0, 2), 16); // hexToR
		var g = parseInt(color.substring(2, 4), 16); // hexToG
		var b = parseInt(color.substring(4, 6), 16); // hexToB
		return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? darkColor : lightColor;

	}



}


