import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserKycListComponent} from './user-kyc/list/user-kyc-list.component';
import {UserKycFormComponent} from './user-kyc/form/user-kyc-form.component';
import {KycGaurdService} from '../../services/route-access-services/kyc.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "User KYC",
			breadcrumb: {
				alias: "User KYC",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "user-kyc/list",
				pathMatch: "full",
			},

			//--------User KYC Routes--------//
			{
				path: "user-kyc/list",
				canActivate: [KycGaurdService],
				component: UserKycListComponent,
				data: {
					title: "User KYC",
					breadcrumb: {
						label: "User KYC",
						alias: "User KYC",
					},
				},
			},
			{
				path: "user-kyc/form/:id",
				canActivate: [KycGaurdService],
				component: UserKycFormComponent,
				data: {
					title: "User KYC",
					breadcrumb: {
						label: "User KYC",
						alias: "User KYC",
					},
				},
			},
			//--------User KYC End--------//


			//--------B&T Error Route--------//
			{
				path: "bnt-error",
				loadChildren: () => import("./bnt-error/bnt-error.module").then((m) => m.BntErrorModule)
			},
			//--------B&T Error End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BasicKycRoutingModule { }
