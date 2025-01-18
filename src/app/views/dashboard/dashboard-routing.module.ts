import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {AuthGaurdService} from "../../services/auth-gaurd.service";

const routes: Routes = [
	{
		path: "",
		data: {
			title: 'Dashboard',
			breadcrumb: {
				alias: "dashboard",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "dashboard",
				pathMatch: "full",
			},
			{
				path: "dashboard",
				canActivate: [AuthGaurdService],
				component: DashboardComponent,
				data: {
					breadcrumb: {
						label: "Dashboard",
						alias: "Dashboard",
					},
				},
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule { }
