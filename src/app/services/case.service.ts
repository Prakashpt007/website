import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
	providedIn: "root",
})



export class CaseService {
	baseUrl: string = environment.baseUrl;
	// baseUrl: string = 'http://192.168.0.128/api/v1';
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
			return error;
		});
	}
	// Handle Errors End

	constructor (private http: HttpClient) { }

	// Get Brief Details By CaseId
	// getBriefDetailsByCaseId(requestUrl: string): Observable<any> {
	//   return this.http
	//     .get<any>(this.baseUrl + '/' + requestUrl)
	//     .pipe(catchError(this.error));
	// }
	getBriefDetailsByCaseId (requestUrl: string): Observable<any> {
		return this.http
			.get<any>(this.baseUrl + '/' + requestUrl)
			// .get<any>('assets/jsons/verification-details.json')
			.pipe(catchError(this.error));
	}

	// -------------------------------------------------------------------------------------- //


	storeBasicDetailsByCaseId (data: object, url: string): Observable<any> {
		return this.http
			.patch<any>(this.baseUrl + "/" + url, data)
			.pipe(catchError(this.error));
	}

	storeBankDetailsByCaseId (data: FormData, url: string): Observable<any> {
		data.append("_method", "PUT");
		return this.http.post<any>(this.baseUrl + "/" + url, data)
			.pipe(catchError(this.error));
	}

	storeWhDetailsByCaseId (data: object, url: string): Observable<any> {
		return this.http
			.patch<any>(this.baseUrl + "/" + url, data)
			.pipe(catchError(this.error));
	}

	storeWhStackDetailsByCaseId (data: object, url: string): Observable<any> {
		return this.http
			.patch<any>(this.baseUrl + "/" + url, data)
			.pipe(catchError(this.error));
	}

	getBasicDetailsByCaseId (requestUrl: string): Observable<any> {
		return this.http
			// .get<any>('assets/jsons/basic-details.json')
			.get<any>(this.baseUrl + '/' + requestUrl)
			.pipe(catchError(this.error));
	}

	// Get Company Details by CaseId
	getCompanyDetailsByCaseId (requestUrl: string): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/company-details.json")
			.get<any>(this.baseUrl + '/' + requestUrl)
			.pipe(catchError(this.error));
	}

	// Get Bank Details by CaseId
	getBankDetailsByCaseId (requestUrl: string): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/bank-details.json")
			.get<any>(this.baseUrl + '/' + requestUrl)
			.pipe(catchError(this.error));
	}

	// Get Land Details by CaseId
	getLandDetailsByCaseId (requestUrl: string): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/land-details.json")
			.get<any>(this.baseUrl + '/' + requestUrl)
			.pipe(catchError(this.error));
	}

	// Get Warehouse Details by CaseId
	getWHDetailsByCaseId (requestUrl: string): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/warehouse-details.json")
			.get<any>(this.baseUrl + '/' + requestUrl)
			.pipe(catchError(this.error));
	}

	getScheduleDatesByCaseId (requestUrl: string): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/schedule-details.json")
			.get<any>(this.baseUrl + '/' + requestUrl)
			.pipe(catchError(this.error));
	}

	// Get KML Details by CaseId
	getCaseKmlDetailsCaseId (requestUrl: string): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/kml-details.json")
			.get<any>(this.baseUrl + '/' + requestUrl)
			.pipe(catchError(this.error));
	}

	// Get Spot Details by CaseId
	getCaseSpotDetailsCaseId (requestUrl: string): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/spot-details-2.json")
			.get<any>(this.baseUrl + '/' + requestUrl)
			.pipe(catchError(this.error));
	}


	getRejectionReasonDList (rejectionReasonTypeId: number): Observable<any> {
		return this.http
			.get<any>(this.baseUrl + `/dropdown/rejection-reason/${ rejectionReasonTypeId }`)
			.pipe(catchError(this.error));
	}

	// Reject Document by docId and reasonId
	rejectDoc (requestUrl: string, data: object): Observable<any> {
		return this.http.patch<any>(this.baseUrl + '/' + requestUrl, data).pipe(catchError(this.error));
	}

	// Approved Document by docId
	approvedDoc (requestUrl: string, data: object): Observable<any> {
		return this.http.patch<any>(this.baseUrl + '/' + requestUrl, data).pipe(catchError(this.error));
	}





	// -------------------------------------------------------------------------------------- //

	getDataList (url: string, params: any): Observable<any> {
		return this.http
			.get<any>(this.baseUrl + "/" + url, {params})
			// .get<any>('assets/jsons/case-list.json')
			.pipe(catchError(this.error));
	}
	// -------------------------------------------


	getDataListUrl () {
		let result: Array<string> | undefined = sessionStorage.getItem('userActivities')?.replaceAll(' ', '').split(',');
		return result;
	}

	approvedSpot (data: object): Observable<any> {
		return this.http
			.patch<any>(this.baseUrl + "/spot-approved", data)
			.pipe(catchError(this.error));
	}
}
