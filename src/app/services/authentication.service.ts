import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import jwt_decode from "jwt-decode";
interface SubMenuItem {
	order?: any;
	name: string;
	href: string;
	icon: string;
	activity?: string[];
	status?: string | boolean; // Add status property
}

interface MenuItem {
	order?: any;
	mainMenu: string;
	href: string;
	icon: string;
	activity?: string[];
	subMenu: SubMenuItem[];
	status?: boolean; // Add status property
}

export class User {
	constructor (public status: string) { }
}

export class JwtResponse {
	constructor () { }
}

const httpOptions = {
	headers: new HttpHeaders({"Content-Type": "application/json"}),
};

@Injectable({
	providedIn: "root",
})
export class AuthenticationService {
	tokenService: any;
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

	errorHandl (error: any) {
		let errorMessage = "";
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${ error.status }\nMessage: ${ error.message }`;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
	}

	// baseUrls = environment.baseUrl + '/authenticate';
	baseUrl = environment.baseUrl;
	loginUrl = environment.baseUrl + "/login/";

	constructor (private httpClient: HttpClient, private router: Router, private toastr: ToastrService) { }

	authenticate (mobile: string, password: string) {
		return this.httpClient.post<any>(this.loginUrl, {mobile, password}).pipe(
			map((userData) => {
				const data: any = jwt_decode(userData.access_token);

				let menuData: MenuItem[];

				if (data['menu'] != undefined) {
					let dashboardObj = {
						mainMenu: "Dashboard",
						href: "/dashboard",
						icon: "<i class='fa-solid fa-chart-simple fa-lg'></i>",
						order: "0",
						subMenu: []
					};


					data['menu'] = [dashboardObj].concat(data['menu']);
					menuData = data['menu'];

					menuData = menuData.slice().sort((a, b) => this.naturalSort(a.order, b.order));
					// Sort submenus for each main menu
					menuData.forEach(menuItem => {
						if (menuItem.subMenu) {
							menuItem.subMenu = menuItem.subMenu.sort((a, b) => this.naturalSort(a.order, b.order));
						}
					});

					if (typeof sessionStorage !== 'undefined') {
						sessionStorage.setItem('menu', `${ JSON.stringify(menuData) }`);
					}
				}

				if (typeof sessionStorage !== 'undefined') {
					sessionStorage.setItem("tokenAccess", userData.access_token);
					sessionStorage.setItem("userActivities", data['activities']);
					sessionStorage.setItem("userId", data['user_id']);
					sessionStorage.setItem("mobile", data['mobile']);
					sessionStorage.setItem("full_name", this.trimString(data['full_name']));
					sessionStorage.setItem("email", data['email']);
					sessionStorage.setItem("userThumbnail", data['thumbnail']);
					sessionStorage.setItem("expires_in", `${ this.addHrToDate(userData.expires_in) }`);
				}

				return userData;
			})
		);
	}

	naturalSort (a: string, b: string) {
		const aParts = a.split('.').map((part: string) => parseInt(part, 10));
		const bParts = b.split('.').map((part: string) => parseInt(part, 10));

		for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
			const aNum = aParts[i] || 0;
			const bNum = bParts[i] || 0;

			if (aNum !== bNum) {
				return aNum - bNum;
			}
		}

		return 0;
	}

	isUserLoggedIn () {
		let user;
		if (typeof sessionStorage !== 'undefined') {
			user = sessionStorage.getItem("tokenAccess");
		}

		return !(user === null);


	}

	logOut () {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.clear();
			localStorage.removeItem('url');
		}

		this.router.navigate(["/login"]);
	}

	isUserSessionValid () {
		let session;
		if (typeof sessionStorage !== 'undefined') {
			session = sessionStorage.getItem("expires_in");
			if (new Date(`${ session }`) > new Date()) {
			} else {
				this.logOut();
				this.toastr.info('Please Log In!');
				this.toastr.warning('Session Expired!');
			}
		}

		return !(session === null);

	}

	addHrToDate (minutesToAdd: number): Date {
		const currentDate = new Date();
		// Calculate the equivalent hr from minutes
		const hoursToAdd = minutesToAdd / 60;

		// Clone the original date to avoid modifying it
		const newDate = new Date(currentDate.getTime());

		// Add the hours to the date
		newDate.setHours(newDate.getHours() + hoursToAdd);

		return newDate;
	}

	trimString (str: any) {
		// Split by "@" to separate username and domain
		const [usernamePart] = str.split('@');

		// Split the username part by "_" or "."
		const usernameParts = usernamePart.split(/[_\.]/).join(' ').split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		return usernameParts;
	}

}

