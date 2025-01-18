import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuyerDefaultManagementListComponent} from './buyer-default-management/list/buyer-default-management-list.component';
import {SellerDefaultManagementListComponent} from './seller-default-management/list/seller-default-management-list.component';


const routes: Routes = [
	{
		path: "",
		data: {
			title: "Intervention",
			breadcrumb: {
				alias: "Intervention",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "buyer-default-management/list",
				pathMatch: "full",
			},

			//--------Buyer Default Management Routes--------//
			{
				path: "buyer-default-management/list",
				component: BuyerDefaultManagementListComponent,
				data: {
					title: "Buyer Default Management",
					breadcrumb: {
						label: "Buyer Default Management",
						alias: "Buyer Default Management",
					},
				},
			},
			//--------Buyer Default Management End--------//



			//--------Seller Default Management Routes--------//
			{
				path: "seller-default-management/list",
				component: SellerDefaultManagementListComponent,
				data: {
					title: "Seller Default Management",
					breadcrumb: {
						label: "Seller Default Management",
						alias: "Seller Default Management",
					},
				},
			},
			//--------Seller Default Management End--------//
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InterventionRoutingModule { }
