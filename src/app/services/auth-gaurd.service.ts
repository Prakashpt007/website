import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGaurdService {

	// constructor(private router: Router,
	//   private authService: AuthenticationService) { }

	// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	//   if (this.authService.isUserLoggedIn())
	//     return true;

	//   this.router.navigate(['login']);
	//   return false;

	// }

	constructor (private authService: AuthenticationService, private toastr: ToastrService, private router: Router) { }
	canActivate ():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {

		if (!this.authService.isUserLoggedIn()) {
			this.toastr.info('Please Log In!');
			this.router.navigate(['/login']);
			return false;
		}
		if (!this.authService.isUserSessionValid()) {
			//   sessionStorage.removeItem("tokenAccess");

			//   if (!this.authService.isUserLoggedIn()) {
			//     this.toastr.info('Please Log In!');
			//     this.toastr.warning('Session Expired!');
			//     this.router.navigate(['/login']);
			//   } else {
			//     this.router.navigate(['/login']);
			//   }
			//   return false;
			// }

			// if (!this.authService.isUserLoggedIn()) {
			//   this.toastr.info('Please Log In!');
			//   this.router.navigate(['/login']);
			return false;
		}

		// logged in, so return true
		return true;
	}

}
