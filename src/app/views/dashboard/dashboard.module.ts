import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {DefaultComponent} from '../../utility/dashboards/default/default.component';
import {ExperimentsComponent} from '../experiments/experiments.component';


@NgModule({
	declarations: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		DefaultComponent,
		DashboardRoutingModule,
		ExperimentsComponent

	]
})
export class DashboardModule { }
