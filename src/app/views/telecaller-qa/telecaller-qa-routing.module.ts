import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeadListComponent} from './lead/list/lead-list.component';
import {LeadFormComponent} from './lead/form/lead-form.component';
import {TelecallerGaurdService} from '../../services/route-access-services/telecaller.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Telecaller",
			breadcrumb: {
				alias: "Telecaller",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "lead/list",
				pathMatch: "full",
			},

			//--------Telecaller QA Lead Routes --------//
			{
				path: "lead/list",
				canActivate: [TelecallerGaurdService],
				component: LeadListComponent,
				data: {
					title: "Telecaller",
					breadcrumb: {
						label: "Telecaller",
						alias: "Telecaller",
					},
				},
			},
			{
				path: "lead/form/:id",
				canActivate: [TelecallerGaurdService],
				component: LeadFormComponent,
				data: {
					title: "Telecaller",
					breadcrumb: {
						label: "Telecaller",
						alias: "Telecaller",
					},
				},
			},
			// -------- Telecaller Lead QA End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TelecallerQaRoutingModule { }
