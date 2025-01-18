import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CriteriaFormComponent} from './criteria/form/criteria-form.component';
import {CriteriaListComponent} from './criteria/list/criteria-list.component';
import {AuthGaurdService} from '../../services/auth-gaurd.service';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Criteria List",
			breadcrumb: {
				alias: "Criteria List",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "farmer/list",
				pathMatch: "full",
			},

			//--------Criteria Routes--------//
			{
				path: "criteria/list",
				component: CriteriaListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Criteria",
					breadcrumb: {
						label: "Criteria",
						alias: "Criteria",
					},
				},
			},
			{
				path: "criteria/form",
				component: CriteriaFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Criteria Details",
					breadcrumb: {
						label: "Criteria Details",
						alias: "Criteria Details",
					},
				},
			},

			{
				path: "criteria/form/:id",
				component: CriteriaFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Criteria Details",
					breadcrumb: {
						label: "Criteria Details",
						alias: "Criteria Details",
					},
				},
			},
			//--------Criteria End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GamificationRoutingModule { }
