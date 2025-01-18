import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeListComponent} from './employee/list/employee-list.component';
import {EmployeeDetailsComponent} from './employee/details/employee-details.component';
import {AuthGaurdService} from '../../services/auth-gaurd.service';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "HR Department",
			breadcrumb: {
				alias: "HR Department",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "employee/list",
				pathMatch: "full",
			},

			//--------Employee Routes--------//
			{
				path: "employee/list",
				canActivate: [AuthGaurdService],
				component: EmployeeListComponent,
				data: {
					title: "Employees",
					breadcrumb: {
						label: "Employees",
						alias: "Employees",
					},
				},
			},
			{
				path: "employee/details",
				canActivate: [AuthGaurdService],
				component: EmployeeDetailsComponent,
				data: {
					title: "Employee Details",
					breadcrumb: {
						label: "Employee Details",
						alias: "Employee Details",
					},
				},
			},
			{
				path: "employee/details/:id",
				canActivate: [AuthGaurdService],
				component: EmployeeDetailsComponent,
				data: {
					title: "Employee Details",
					breadcrumb: {
						label: "Employee Details",
						alias: "Employee Details",
					},
				},
			},
			//--------Employee Routes End--------//
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class HrDepartmentRoutingModule { }
