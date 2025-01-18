import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpXhrBackend} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

@Injectable({
	providedIn: "root",
})

export class GenericHttpService {
	// Handle Errors
	error (error: HttpErrorResponse) {
		let errorMessage = {
			errorStatusCode: "",
			errorMessage: "",
		};
		if (error.error instanceof ErrorEvent) {
			errorMessage = {
				errorStatusCode: "",
				errorMessage: `${ error.error.message }`,
			};
		} else {
			errorMessage = {
				errorStatusCode: `${ error.status }`,
				errorMessage: `${ error.message }`,
			};

			// `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(() => {
			// return errorMessage;
			return error;
		});
	}
	// Handle Errors End

	baseUrl: string = environment.baseUrl;

	constructor (private http: HttpClient, private backend: HttpXhrBackend) { }

	// Get Dummy List
	getDummyList (url: string, params: any): Observable<any> {
		return this.http.get<any>("/" + url, {params}).pipe(catchError(this.error));
	}
	// Get Dummy Data
	getDummyData (url: string): Observable<any> {
		return this.http.get<any>("/" + url).pipe(catchError(this.error));
	}

	// Get Dummy Data 2
	getDummyData2 (url: string): Observable<any> {
		return this.http.get<any>(url).pipe(catchError(this.error));
	}

	// Get Dummy Dropdown list
	getDummyDList (url: string,): Observable<any> {
		return this.http.get<any>("/" + url).pipe(catchError(this.error));
	}

	// Download file by url
	getFileByUrl (url: string,): Observable<any> {
		return this.http.get<any>(url).pipe(catchError(this.error));
	}

	// Get All Menu List
	getAllMenu (): Observable<any> {
		return this.http.get<any>(this.baseUrl + "/gen/menu").pipe(catchError(this.error));
	}
	// Store Menu Order
	storeMenuOrder (data: Object): Observable<any> {
		return this.http.post<any>(this.baseUrl + "/menu/order", data).pipe(catchError(this.error));
	}

	// Get User Menu List
	getUserMenu (activities: any): Observable<any> {
		return this.http.post<any>(this.baseUrl + "/gen/menu-activity", {"activity": activities}).pipe(catchError(this.error));
	}

	// Get Form Details
	getFormData (url: string): Observable<any> {
		return this.http.get<any>(this.baseUrl + "/" + url).pipe(catchError(this.error));
	}

	// Get User Activities
	getUserActivities () {
		let result: Array<string> | undefined = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('userActivities')?.replaceAll(' ', '').split(',') : undefined;
		return result;
	}

	// Get Search Results
	searchData (url: string): Observable<any> {
		return this.http.get<any>(this.baseUrl + "/" + url).pipe(catchError(this.error));
	}
	// Get Dummy Search Results
	searchDummyData (url: string, data: any): Observable<any> {
		return this.http.get<any>(url, data).pipe(catchError(this.error));
	}

	// Get Data Table List
	getDataList (url: string, params: any): Observable<any> {
		return this.http.get<any>(this.baseUrl + "/" + url, {params}).pipe(catchError(this.error));
	}

	getPageDetailsByPageId (requestUrl: string): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/' + requestUrl)
			.pipe(catchError(this.error));
	}

	// Store FormData Details
	storeFormData (data: FormData, url: string): Observable<any> {
		return this.http.post<any>(this.baseUrl + "/" + url, data).pipe(catchError(this.error));
	}

	// Store Data by Patch Request
	storeObjectDataByPatchMethod (data: object, url: string): Observable<any> {
		return this.http
			.patch<any>(this.baseUrl + "/" + url, data)
			.pipe(catchError(this.error));
	}

	// Delete Record Request
	deleteAction (requestUrl: string): Observable<any> {
		return this.http.delete<any>(this.baseUrl + '/' + requestUrl).pipe(catchError(this.error));
	}


	// Reject Document by docId and reasonId
	rejectDoc (requestUrl: string, data: object): Observable<any> {
		return this.http.patch<any>(this.baseUrl + '/' + requestUrl, data).pipe(catchError(this.error));
	}

	// Approved Document by docId
	approvedDoc (requestUrl: string, data?: object): Observable<any> {
		return this.http.patch<any>(this.baseUrl + '/' + requestUrl, data).pipe(catchError(this.error));
	}

	// Edit And Store FormData Details by using "data.append('_method', 'PUT')" & Post Method
	editFormData (data: FormData, url: string): Observable<any> {
		data.append("_method", "PUT");
		return this.http.post<any>(this.baseUrl + "/" + url, data).pipe(catchError(this.error));
	}

	// Insert Multiple Records by using Bulk Insert
	bulkFormData (dataUrl: any, formData: FormData): Observable<any> {
		return this.http.post<any>(this.baseUrl + "/" + dataUrl, formData).pipe(catchError(this.error));
	}

	// Apply Dynamic Actions on Records


	actionRequest (data: any): Observable<any> {
		if (data['actionName'] == 'delete') {
			return this.http.delete<any>(this.baseUrl + "/" + data['actionUrl'] + "/" + data.id[0]).pipe(catchError(this.error));
		} else {
			return this.http.post<any>(this.baseUrl + "/" + data['actionUrl'], {id: data.id}).pipe(catchError(this.error));
		}
	}

	actionGetRequest (dataUrl: any): Observable<any> {
		return this.http.get<any>(this.baseUrl + "/" + dataUrl).pipe(catchError(this.error));

	}


	// Get Details By Post Some Data
	getDetailsByPostSomeData (data: object, url: string): Observable<any> {
		return this.http.post<any>(this.baseUrl + "/" + url, data).pipe(catchError(this.error));
	}


	// --------------------------- Dropdown API's ---------------------------------- //

	// Get Rejection Reason By ReasonTypeId Dropdown list
	getRejectionReasonDList (typeId: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/rejection-reason/${ typeId }`).pipe(catchError(this.error));
	}

	// Get Crop Type Dropdown list
	getCropTypeDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/crop-type`).pipe(catchError(this.error));
	}

	// Get Commodity Dropdown list
	getCommodityDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/commodity`).pipe(catchError(this.error));
	}

	// Get Quality Band Dropdown list
	getQualityBandDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/quality-band`).pipe(catchError(this.error));
	}

	// Get Parent Variety By Commodity Id
	getParentVarietyDList (commodity_id: Number): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/variety/${ commodity_id }`).pipe(catchError(this.error));
	}

	// Get Params By Commodity Id
	getParamsByCommodityDList (commodity_id: Number, variety_id: Number): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/parameter/${ commodity_id }/${ variety_id }`).pipe(catchError(this.error));
	}

	// Get Bands By Commodity Id
	getBandsByCommodityDList (commodity_id: Number, variety_id: Number): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/quality-band/${ commodity_id }/${ variety_id }`).pipe(catchError(this.error));
	}

	// Get Language Dropdown list
	getLanguageDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/language`).pipe(catchError(this.error));
	}

	// Get Activity list
	getActivityDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/activity`).pipe(catchError(this.error));
	}

	// Get Access Group list
	getAccessGroupDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/access-group`).pipe(catchError(this.error));
	}

	// Get UOM Activity list
	getActivityPermissionDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/permission`).pipe(catchError(this.error));
	}

	// Get UOM Dropdown list
	getUomTypeDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/uom-type`).pipe(catchError(this.error));
	}

	// Get Region Dropdown list
	getRegionDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/region`).pipe(catchError(this.error));
	}

	// Get State Dropdown list
	getStateDList (): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/state`).pipe(catchError(this.error));
	}

	// Get UOM Dropdown list
	getUomDListByUomTypeId (uomTypeId: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/uom/${ uomTypeId }`).pipe(catchError(this.error));
	}

	// Get Reporting Manager list
	getReportingManagersByRegionId (regionId: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/rm-by-region/${ regionId }`).pipe(catchError(this.error));
	}

	// Get Warehouse List list
	getWarehouseListByRegionId (regionId: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/warehouse/${ regionId }`).pipe(catchError(this.error));
	}

	// Get Warehouse Dropdown list
	getWhDListByRegionId (regionId: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/logistic-hub/${ regionId }`).pipe(catchError(this.error));
	}
	// Get Stage Video Dropdown By Stage Ids
	getStageVideoDListByStageIds (params: any): Observable<any> {
		return this.http.get<any>(this.baseUrl + `/dropdown/stage-video?stageIds=${ params }`).pipe(catchError(this.error));
	}


	// --------------------------- End ---------------------------------- //


	// --------------------------- Generic Function ---------------------------------- //
	getValidationStsIcon (key: any) {
		let result = "";
		switch (key) {
			case "bankAccountStatus":
				result = `<i class="fa-building-columns fa-solid me-1"></i><span class="text">Bank</span>`;
				break;
			case "caseWarehouseStatus":
				result = `<i class="fa-solid fa-warehouse me-1"></i><span class="text">Warehouse</span>`;
				break;
			case "companyStatus":
				result = `<i class="fa-regular fa-building me-1"></i><span class="text">Company</span>`;
				break;
			case "farmStatus":
				result = `<i class="fa-solid fa-file-invoice me-1"></i><span class="text">Land</span>`;
				break;
			case "userStatus":
				result = `<i class="fa-solid fa-user me-1"></i><span class="text">User</span>`;
				break;
			case "spotStatus":
				result = `<i class="fa-solid fa-location-dot me-1"></i><span class="text">Spot</span>`;
				break;
			case "kmlStatus":
				result = `<i class="fa-solid fa-map-location-dot me-1"></i><span class="text">KML</span>`;
				break;
			case "schedulingStatus":
				result = `<i class="fa-regular fa-calendar-days me-1"></i><span class="text">Scheduling</span>`;
				break;
			default:
				console.log("Invalid Icon");
				break;
		}
		return result;
	};


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
	};


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

			case "VALIDATION_FAILED":
				sts = `text-bg-danger`;
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
				break;
		}
		return sts;
	}

	// ---------------------------       End        ---------------------------------- //



	// --------------------------- Validation Regex Function ---------------------------------- //


	aadharRegex () {
		return [Validators.pattern(/^[1-9][0-9]{11}$/)];
	}
	panRegex () {
		return [Validators.pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}/), Validators.minLength(10), Validators.maxLength(10)];
	}

	pincodeRegex () {
		return [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(6), Validators.maxLength(6)];
	}

	phoneNoRegex () {
		return [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(6), Validators.maxLength(10)];
	}
	mobileNoRegex () {
		return [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10)];
	}

	urlRegex () {
		// return [Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g)];

		//return [Validators.pattern(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\/?\??.*)$/)];
		// return [Validators.pattern(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\/?\??.*)$/gm)];

		//return [Validators.pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i)];

		return [Validators.pattern(/^(https?:\/\/(www\.)?|www\.)/)];
	}

	cinRegex () {
		return [Validators.pattern(/^([Ll|Uu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/), Validators.minLength(21), Validators.maxLength(21)];
	}
	gstRegex () {
		return [Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/), Validators.minLength(15), Validators.maxLength(15)];
	}


	// -------------------------------------- End --------------------------------------------- //
}


export function mobileNumberValidator (control: AbstractControl): ValidationErrors | null {
	const value = control.value;

	if (!value) {
		return null;
	}

	// Regular expression to match optional country code and 10 digits
	const mobilePattern = /^(\+91)?[6-9]\d{9}$/;

	if (!mobilePattern.test(value)) {
		return {invalidMobileNumber: true};
	}

	return null;
}
