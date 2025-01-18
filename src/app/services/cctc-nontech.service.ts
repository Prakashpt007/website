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
export class CctcNontechService {
	baseUrl: string = environment.baseUrl + "/cctc-nontech";

	CctcNonTechListData = [];

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

	// Get CCTC-NonTech List
	getCctcNonTechList (params: object): Observable<any> {
		// return this.http.get<any>(this.baseUrl+'/list').pipe(catchError(this.error));
		return this.http
			.get<any>("assets/jsons/cctc-nontech-list.json")
			.pipe(catchError(this.error));
	}

	// Get Case Details by CaseId
	getCaseDetailsByCaseId (caseId: string): Observable<any> {
		return (
			this.http
				// .get<any>(this.baseUrl + "?pk=" + caseId)
				.get<any>("assets/jsons/kyc-details.json")
				.pipe(catchError(this.error))
		);
	}

	// Get Case Verification Details by CaseId
	getCaseVerificationDetailsByCaseId (caseId: string): Observable<any> {
		return (
			this.http
				// .get<any>(this.baseUrl + "?pk=" + caseId)
				.get<any>("assets/jsons/verification-details.json")
				.pipe(catchError(this.error))
		);
	}

	// Update Case Details
	updateCaseDetails (data: object, caseId: string): Observable<any> {
		return this.http
			.patch<any>(this.baseUrl + "/" + caseId, data)
			.pipe(catchError(this.error));
	}

	// Reject Case
	rejectCase (caseId: string): Observable<any> {
		return this.http
			.delete<any>(this.baseUrl + "/" + caseId)
			.pipe(catchError(this.error));
	}

	confirmScheduledDate (data: object, caseId: string): Observable<any> {
		return this.http
			.patch<any>(this.baseUrl + "/" + caseId, data)
			.pipe(catchError(this.error));
	}
}
