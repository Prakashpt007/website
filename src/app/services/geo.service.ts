import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpXhrBackend,
  HttpRequest,
} from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class GeoService {
  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = {
      errorStatusCode: "",
      errorMessage: "",
    };
    if (error.error instanceof ErrorEvent) {
      errorMessage = {
        errorStatusCode: "",
        errorMessage: `${error.error.message}`,
      };
    } else {
      errorMessage = {
        errorStatusCode: `${error.status}`,
        errorMessage: `${error.message}`,
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

  constructor(private http: HttpClient, private backend: HttpXhrBackend) { }

  // FormData Details
  getFormData(url: string): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + "/" + url)
      .pipe(catchError(this.error));
  }

  // Data List
  getDataList(url: string, params: any): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + "/" + url, { params })
      .pipe(catchError(this.error));
  }

  // FormData Details
  storeFormData(data: FormData, url: string): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + "/" + url, data)
      .pipe(catchError(this.error));
  }

  // FormData Details
  editFormData(data: FormData, url: string): Observable<any> {
    data.append("_method", "PUT")
    return this.http
      .post<any>(this.baseUrl + "/" + url, data)
      .pipe(catchError(this.error));
  }

  // Bulk Form Data Details
  bulkFormData(dataUrl: any, formData: FormData): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + "/" + dataUrl, formData)
      .pipe(catchError(this.error));
  }

  // Record Actions
  actionRequest(data: any): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + "/" + data['actionUrl'], { id: data.id })
      .pipe(catchError(this.error));
  }
}
