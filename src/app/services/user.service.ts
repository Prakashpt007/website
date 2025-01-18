import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, catchError, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  constructor (private http: HttpClient) { }

  getUserDetails (url: string): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + "/" + url)
      .pipe(catchError(this.error));
  }

  storeUserDetails (data: object, url: string): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + "/" + url, data)
      .pipe(catchError(this.error));
  }

  getUserProfileImage (url: string): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + "/" + url)
      .pipe(catchError(this.error));
  }

  storeUserProfileImage (data: FormData, url: string): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + "/" + url, data)
      .pipe(catchError(this.error));
  }

  changePasswordRequest (data: object, url: string): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + "/" + url, data)
      .pipe(catchError(this.error));
  }
}
