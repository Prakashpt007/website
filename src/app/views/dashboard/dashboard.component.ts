import {Component, ViewEncapsulation} from '@angular/core';
import {GenericHttpService} from '../../services/generic-http.service';
import {Router, UrlTree} from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	standalone: false
})

export class DashboardComponent {
	userRole!: string;
	userActivity!: string[] | undefined;

	constructor (private genericHttp: GenericHttpService, private router: Router) {
		if (localStorage.getItem("url") != undefined) {
			localStorage.removeItem('url');
		}
	}

	ngOnInit () {
		this.userActivity = this.genericHttp.getUserActivities();
		// this.userRole = await this.getUserDashboard();
		this.userRole = this.userActivity?.[0] ? this.userActivity?.[0] : "";
	}

	// async getUserDashboard () {
	//     return this.userActivity?.[0] ? this.userActivity?.[0] : "";
	// }
}
