import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChannelListComponent} from './channel/list/channel-list.component';
import {ChannelFormComponent} from './channel/form/channel-form.component';
import {AlertGaurdService} from '../../services/route-access-services/alert.guard';
import {AlertListComponent} from './alert/list/alert-list.component';
import {AlertFormComponent} from './alert/form/alert-form.component';
import {TemplateListComponent} from './template/list/template-list.component';
import {TemplateFormComponent} from './template/form/template-form.component';
import {TemplateVariableFormComponent} from './template-variable/form/template-variable-form.component';
import {TemplateVariableListComponent} from './template-variable/list/template-variable-list.component';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Alerts",
			breadcrumb: {
				alias: "Alerts",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "channel/list",
				pathMatch: "full",
			},

			//--------Channels Routes--------//
			{
				path: "channel/list",
				canActivate: [AlertGaurdService],
				component: ChannelListComponent,
				data: {
					title: "Channels",
					breadcrumb: {
						label: "Channels",
						alias: "Channels",
					},
				},
			},
			{
				path: "channel/form",
				canActivate: [AlertGaurdService],
				component: ChannelFormComponent,
				data: {
					title: "Channel",
					breadcrumb: {
						label: "Channel",
						alias: "Channel",
					},
				},
			},
			{
				path: "channel/form/:id",
				canActivate: [AlertGaurdService],
				component: ChannelFormComponent,
				data: {
					title: "Channel",
					breadcrumb: {
						label: "Channel",
						alias: "Channel",
					},
				},
			},
			//--------Channels End--------//

			//--------Alerts Routes--------//
			{
				path: "alert/list",
				canActivate: [AlertGaurdService],
				component: AlertListComponent,
				data: {
					title: "Alerts",
					breadcrumb: {
						label: "Alerts",
						alias: "Alerts",
					},
				},
			},
			{
				path: "alert/form",
				canActivate: [AlertGaurdService],
				component: AlertFormComponent,
				data: {
					title: "Alert",
					breadcrumb: {
						label: "Alert",
						alias: "Alert",
					},
				},
			},
			{
				path: "alert/form/:id",
				canActivate: [AlertGaurdService],
				component: AlertFormComponent,
				data: {
					title: "Alert",
					breadcrumb: {
						label: "Alert",
						alias: "Alert",
					},
				},
			},
			//--------Alerts End--------//

			//--------Templates Variable Routes--------//
			{
				path: "variable/list",
				canActivate: [AlertGaurdService],
				component: TemplateVariableListComponent,
				data: {
					title: "Variables",
					breadcrumb: {
						label: "Variables",
						alias: "Variables",
					},
				},
			},
			{
				path: "variable/form",
				canActivate: [AlertGaurdService],
				component: TemplateVariableFormComponent,
				data: {
					title: "Variable",
					breadcrumb: {
						label: "Variable",
						alias: "Variable",
					},
				},
			},
			{
				path: "variable/form/:id",
				canActivate: [AlertGaurdService],
				component: TemplateVariableFormComponent,
				data: {
					title: "Variable",
					breadcrumb: {
						label: "Variable",
						alias: "Variable",
					},
				},
			},
			//--------Templates Variable End--------//

			//--------Templates Variable Routes--------//
			{
				path: "template/list",
				canActivate: [AlertGaurdService],
				component: TemplateListComponent,
				data: {
					title: "Templates",
					breadcrumb: {
						label: "Templates",
						alias: "Templates",
					},
				},
			},
			{
				path: "template/form",
				canActivate: [AlertGaurdService],
				component: TemplateFormComponent,
				data: {
					title: "Template",
					breadcrumb: {
						label: "Template",
						alias: "Template",
					},
				},
			},
			{
				path: "template/form/:id",
				canActivate: [AlertGaurdService],
				component: TemplateFormComponent,
				data: {
					title: "Template",
					breadcrumb: {
						label: "Template",
						alias: "Template",
					},
				},
			}
			//--------Templates End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AlertRoutingModule { }
