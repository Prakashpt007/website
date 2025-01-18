import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TenderListComponent} from './tender/list/tender-list.component';
import {AuthGaurdService} from '../../../services/auth-gaurd.service';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Tender",
			breadcrumb: {
				alias: "Tender",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "tender/list",
				pathMatch: "full",
			},

			//--------Tender Routes--------//
			{
				path: "tender/list",
				canActivate: [AuthGaurdService],
				component: TenderListComponent,
				data: {
					title: "Tenders",
					breadcrumb: {
						label: "Tenders",
						alias: "Tenders",
					},
				},
			},
			// {
			// 	path: "tender/form/:id",
			// 	component: TenderViewModalComponent,
			// 	data: {
			// 		title: "Tender",
			// 		breadcrumb: {
			// 			label: "Tender",
			// 			alias: "Tender",
			// 		},
			// 	},
			// },
			//--------Tender End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BntErrorRoutingModule { }
