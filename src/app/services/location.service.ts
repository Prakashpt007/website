import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class LocationService {
	// baseUrl: string = environment.baseUrl + "/location";
	baseUrl: string = environment.baseUrl;
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

	// Get State List
	getCountryDList (): Observable<any> {
		return this.http
			.get<any>(this.baseUrl + '/dropdown/country')
			.pipe(catchError(this.error));
	}

	// Get State List
	getStateDList (): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/state.json")
			.get<any>(this.baseUrl + `/dropdown/state`)
			.pipe(catchError(this.error));
	}

	// Get State List
	getStateByCountryDList (countryId: number): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/state.json")
			.get<any>(this.baseUrl + `/dropdown/state/${ countryId }`)
			.pipe(catchError(this.error));
	}

	// Get District List
	getDistrictDList (stateId: number): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/district.json")
			.get<any>(this.baseUrl + `/dropdown/district/${ stateId }`)
			.pipe(catchError(this.error));
	}

	// Get City List
	getCityDList (stateId: string, district: string): Observable<any> {
		return this.http
			// .get<any>("assets/jsons/city.json")
			.get<any>(this.baseUrl + `/dropdown/city/${ stateId }/${ district }`)
			.pipe(catchError(this.error));
	}
}
