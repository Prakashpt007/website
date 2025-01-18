import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataAnalyticsListComponent} from './data-analytics/list/data-analytics-list.component';
import {OperationGuard} from '../../services/route-access-services/operation.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Operations",
			breadcrumb: {
				alias: "Operations",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "region/list",
				pathMatch: "full",
			},

			//--------Regional Operations Routes--------//
			{
				path: "region/list",
				canActivate: [OperationGuard],
				component: DataAnalyticsListComponent,
				data: {
					title: "Operations",
					breadcrumb: {
						label: "Operations",
						alias: "Operations",
					},
				},
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OperationRoutingModule { };
