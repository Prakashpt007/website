import {Injectable} from "@angular/core";
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from "@angular/common/http";
import {Observable, BehaviorSubject, of} from "rxjs";
import {finalize, switchMap, filter, take, concatMap, tap} from "rxjs/operators";
import {LoadingService} from "./loading.service";
import {AuthenticationService} from "./services/authentication.service";
import {environment} from "../environments/environment";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	private requestQueue: BehaviorSubject<HttpRequest<any>[]>;
	private isProcessing: boolean = false;
	private activeRequests: number = 0;

	constructor (
		private loadingService: LoadingService,
		private authenticationService: AuthenticationService
	) {
		this.requestQueue = new BehaviorSubject<HttpRequest<any>[]>([]);
	}

	intercept (
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const loadingRef = this.loadingService.open();
		this.activeRequests++;

		if (!this.authenticationService.isUserLoggedIn()) {
			this.authenticationService.logOut();
		}

		// Apply CSS properties to the div element
		const divElement = document.getElementById('yourDivElementId');
		if (divElement) {
			// divElement.style.backgroundColor = 'lightblue';
			// divElement.style.padding = '0.625rem';
			divElement.style.filter = 'blur(0.3125rem)';
			// divElement.style.transform = 'scale(0.8)';
			divElement.style.transition = 'all 0.3s ease'; // Add transition property
			document.body.style.pointerEvents = 'none';
		}

		// Add the incoming request to the queue
		this.addToQueue(req);

		// If not already processing, start processing the queue
		if (!this.isProcessing) {
			this.isProcessing = true;
			return this.processQueue(next).pipe(
				finalize(() => {
					loadingRef.close();
					if (divElement) {
						divElement.style.filter = 'unset';
						divElement.style.transition = 'unset';
						document.body.style.pointerEvents = '';
					}
					this.activeRequests = 0;
				})
			);
		} else {
			// If already processing, return the observable from the queue
			return this.processQueue(next).pipe(
				tap(() => {
					if (this.activeRequests === 0) {
						loadingRef.close();
					}
				})
			);
		}
	}

	private addToQueue (req: HttpRequest<any>) {

		const currentQueue = this.requestQueue.value;
		this.requestQueue.next([...currentQueue, req]);
	}

	private processQueue (next: HttpHandler): Observable<HttpEvent<any>> {
		return this.requestQueue.pipe(
			filter(requests => requests.length > 0),
			take(1), // Take only one value from the queue (ensures sequential processing)
			switchMap(requests => {
				// Process each request sequentially
				return this.handleRequest(requests[0], next).pipe(
					concatMap((response) => {
						// Remove the processed request from the queue
						const updatedQueue = [...requests.slice(1)];
						this.requestQueue.next(updatedQueue);



						// Process the next request in the queue
						if (updatedQueue.length > 0) {
							return this.processQueue(next);
						} else {
							this.isProcessing = false; // Reset processing flag when queue is empty
							return of(response);
						}
					})
				);
			})
		);
	}

	private handleRequest (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Clone the request
		let reqClone = req.clone();


		// Skip adding token and headers for different API URLs
		if (!req.url.startsWith(environment.baseUrl)) {
			return next.handle(reqClone);
		}


		// Check user authentication before proceeding
		if (!this.authenticationService.isUserLoggedIn()) {
			// You may want to handle unauthorized access appropriately
			// For example, redirect to login page or show an error message
			return next.handle(reqClone);
		}

		// Set authorization header if token exists
		const token = sessionStorage.getItem("tokenAccess");
		if (token) {
			reqClone = reqClone.clone({
				setHeaders: {
					Authorization: `Bearer ${ token }`
				}
			});
		}

		// Set CORS headers (if needed)
		reqClone = reqClone.clone({
			setHeaders: {
				"Allow-Origin": environment.allowOrigin,
				"Access-Control-Allow-Origin": environment.allowOrigin
			}
		});

		// Continue with the API request
		return next.handle(reqClone).pipe(
			finalize(() => {
				this.activeRequests--;
			})
		);
	}
}
