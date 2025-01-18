import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankAccountListComponent} from './bank-account/list/bank-account-list.component';
import {BankAccountFormComponent} from './bank-account/form/bank-account-form.component';
import {CompanyListComponent} from './company/list/company-list.component';
import {CompanyFormComponent} from './company/form/company-form.component';
import {OwnedLandListComponent} from './owned/list/owned-land-list.component';
import {OwnedLandFormComponent} from './owned/form/owned-land-form.component';
import {LeasedLandListComponent} from './leased/list/leased-land-list.component';
import {LeasedLandFormComponent} from './leased/form/leased-land-form.component';
import {FinanceGaurdService} from '../../../services/route-access-services/finance.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Finance QA",
			breadcrumb: {
				alias: "Finance QA",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "bank-account/list",
				pathMatch: "full",
			},

			//-------- Bank Account QA Routes --------//
			{
				path: "bank-account/list",
				canActivate: [FinanceGaurdService],
				component: BankAccountListComponent,
				data: {
					title: "Finance QA",
					breadcrumb: {
						label: "Finance QA",
						alias: "Finance QA",
					},
				},
			},
			{
				path: "bank-account/form/:id",
				canActivate: [FinanceGaurdService],
				component: BankAccountFormComponent,
				data: {
					title: "Finance QA",
					breadcrumb: {
						label: "Finance QA",
						alias: "Finance QA",
					},
				},
			},
			//-------- Bank Account QA End--------//

			//-------- Company QA Routes --------//
			{
				path: "company/list",
				canActivate: [FinanceGaurdService],
				component: CompanyListComponent,
				data: {
					title: "Finance QA",
					breadcrumb: {
						label: "Finance QA",
						alias: "Finance QA",
					},
				},
			},
			{
				path: "company/form/:id",
				canActivate: [FinanceGaurdService],
				component: CompanyFormComponent,
				data: {
					title: "Finance QA",
					breadcrumb: {
						label: "Finance QA",
						alias: "Finance QA",
					},
				},
			},
			//-------- Company QA End--------//

			//-------- Owned Land QA Routes --------//
			{
				path: "owned-land/list",
				canActivate: [FinanceGaurdService],
				component: OwnedLandListComponent,
				data: {
					title: "Finance QA",
					breadcrumb: {
						label: "Finance QA",
						alias: "Finance QA",
					},
				},
			},
			{
				path: "owned-land/form/:id",
				canActivate: [FinanceGaurdService],
				component: OwnedLandFormComponent,
				data: {
					title: "Finance QA",
					breadcrumb: {
						label: "Finance QA",
						alias: "Finance QA",
					},
				},
			},

			{
				path: "leased-land/list",
				canActivate: [FinanceGaurdService],
				component: LeasedLandListComponent,
				data: {
					title: "Finance QA",
					breadcrumb: {
						label: "Finance QA",
						alias: "Finance QA",
					},
				},
			},
			{
				path: "leased-land/form/:id",
				canActivate: [FinanceGaurdService],
				component: LeasedLandFormComponent,
				data: {
					title: "Finance QA",
					breadcrumb: {
						label: "Finance QA",
						alias: "Finance QA",
					},
				},
			},
			//-------- Land QA End--------//
		]
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BntErrorRoutingModule { }
