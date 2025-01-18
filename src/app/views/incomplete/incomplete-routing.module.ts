import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PendingListComponent} from './pending/list/pending-list.component';
import {PendingFormComponent} from './pending/form/pending-form.component';
import {UnpaidFormComponent} from './unpaid/form/unpaid-form.component';
import {UnpaidListComponent} from './unpaid/list/unpaid-list.component';
import {IncompleteGaurdService} from '../../services/route-access-services/incomplete.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Incomplate Case",
			breadcrumb: {
				alias: "Incomplate Case",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "pending/list",
				pathMatch: "full",
			},

			//-------- Pending QA Routes--------//
			{
				path: "pending/list",
				canActivate: [IncompleteGaurdService],
				component: PendingListComponent,
				data: {
					title: "Incomplate Cases",
					breadcrumb: {
						label: "Incomplate Cases",
						alias: "Incomplate Cases",
					},
				},
			},
			{
				path: "pending/view/:id",
				canActivate: [IncompleteGaurdService],
				component: PendingFormComponent,
				data: {
					title: "Incomplate Case",
					breadcrumb: {
						label: "Incomplate Case",
						alias: "Incomplate Case",
					},
				},
			},
			//--------Pending QA End--------//


			//-------- Unpaid QA Routes--------//
			{
				path: "unpaid/list",
				canActivate: [IncompleteGaurdService],
				component: UnpaidListComponent,
				data: {
					title: "Incomplate Cases",
					breadcrumb: {
						label: "Incomplate Cases",
						alias: "Incomplate Cases",
					},
				},
			},
			{
				path: "unpaid/view/:id",
				canActivate: [IncompleteGaurdService],
				component: UnpaidFormComponent,
				data: {
					title: "Incomplate Case",
					breadcrumb: {
						label: "Incomplate Case",
						alias: "Incomplate Case",
					},
				},
			},
			//--------Unpaid QA End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IncompleteRoutingModule { }
