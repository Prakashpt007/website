import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PendingListComponent} from './pending/list/pending-list.component';
import {ActiveListComponent} from './active/list/active-list.component';
import {PendingFormComponent} from './pending/form/pending-form.component';
import {ActiveFormComponent} from './active/form/active-form.component';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "E-Way Bills",
			breadcrumb: {
				alias: "E-Way Bills",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "pending/list",
				pathMatch: "full",
			},

			//-------- Pending Routes --------//
			{
				path: "pending/list",
				component: PendingListComponent,
				data: {
					title: "Pending Bills",
					breadcrumb: {
						label: "Pending Bills",
						alias: "Pending Bills",
					},
				},
			},
			{
				path: "pending/form/:id",
				component: PendingFormComponent,
				data: {
					title: "Pending Bill",
					breadcrumb: {
						label: "Pending Bill",
						alias: "Pending Bill",
					},
				},
			},
			// -------- Pending End--------//

			//-------- Active Routes --------//
			{
				path: "active/list",
				component: ActiveListComponent,
				data: {
					title: "Active Bills",
					breadcrumb: {
						label: "Active Bills",
						alias: "Active Bills",
					},
				},
			},
			{
				path: "active/form/:id",
				component: ActiveFormComponent,
				data: {
					title: "Active Bill",
					breadcrumb: {
						label: "Active Bill",
						alias: "Active Bill",
					},
				},
			},
			// -------- Active End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EWayRoutingModule { }
