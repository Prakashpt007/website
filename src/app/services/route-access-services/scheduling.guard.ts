import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthenticationService} from "../authentication.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
	providedIn: "root",
})

export class SchedulingGaurdService {
	constructor (private authService: AuthenticationService, private toastr: ToastrService, private router: Router) { }
	canActivate (route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {

		if (localStorage.getItem('url') === null) {
			// Get the full URL
			const fullUrl = state.url;
			const routeUrl = route.url;
			localStorage.setItem('url', fullUrl);


		} else {
			// return true;
		}

		if (!this.authService.isUserLoggedIn()) {
			this.toastr.info('Please Log In!');
			this.router.navigate(['/login']);
			return false;
		}

		if (!this.authService.isUserSessionValid()) {
			return false;
		}

		if (!((typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('userActivities')?.replaceAll(' ', '').split(',') : undefined)?.includes('VALIDATE_CASE_SCHEDULING')) {
			this.toastr.info(`You are not authorized to view this page. Required => VALIDATE_CASE_SCHEDULING`, `Access Denied`);
			this.router.navigate(["/dashboard"]);
			localStorage.removeItem('url');
			return false;
		}

		// logged in, so return true
		this.authService.isUserLoggedIn();
		return true;
	}
}
