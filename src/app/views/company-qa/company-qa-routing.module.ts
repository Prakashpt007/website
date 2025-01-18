import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyVerificationListComponent} from './company-verification/list/company-verification-list.component';
import {CompanyVerificationFormComponent} from './company-verification/form/company-verification-form.component';
import {CompanyGaurdService} from '../../services/route-access-services/company.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Company QA",
			breadcrumb: {
				alias: "Company QA",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "verification/list",
				pathMatch: "full",
			},

			//--------Company Verification QA Routes--------//
			{
				path: "verification/list",
				canActivate: [CompanyGaurdService],
				component: CompanyVerificationListComponent,
				data: {
					title: "Company QA",
					breadcrumb: {
						label: "Company QA",
						alias: "Company QA",
					},
				},
			},
			{
				path: "verification/form/:id",
				canActivate: [CompanyGaurdService],
				component: CompanyVerificationFormComponent,
				data: {
					title: "Company QA",
					breadcrumb: {
						label: "Company QA",
						alias: "Company QA",
					},
				},
			},
			//--------Company Verification End--------//
		]
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CompanyQaRoutingModule { }
