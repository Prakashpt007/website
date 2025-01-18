import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PendingListComponent} from './pending/list/pending-list.component';
import {PendingFormComponent} from './pending/form/pending-form.component';
import {ApprovedFormComponent} from './approved/form/approved-form.component';
import {ApprovedListComponent} from './approved/list/approved-list.component';
import {WarehouseTypeListComponent} from './warehouse-type/list/warehouse-type-list.component';
import {WarehouseTypeFormComponent} from './warehouse-type/form/warehouse-type-form.component';
import {AuthGaurdService} from '../../services/auth-gaurd.service';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Warehouse",
			breadcrumb: {
				alias: "Warehouse",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "pending/list",
				pathMatch: "full",
			},

			//--------Pending Warehouse Routes--------//
			{
				path: "pending/list",
				component: PendingListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Pending Warehouses",
					breadcrumb: {
						label: "Pending Warehouses",
						alias: "Pending Warehouses",
					},
				},
			},
			{
				path: "pending/form",
				component: PendingFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Pending Warehouse Details",
					breadcrumb: {
						label: "Pending Warehouse Details",
						alias: "Pending Warehouse Details",
					},
				},
			},
			{
				path: "pending/form/:id",
				component: PendingFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Pending Warehouse Details",
					breadcrumb: {
						label: "Pending Warehouse Details",
						alias: "Pending Warehouse Details",
					},
				},
			},
			//--------Pending Warehouse Routes End--------//

			//--------Approved Warehouse Routes--------//
			{
				path: "approved/list",
				component: ApprovedListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Approved Warehouses",
					breadcrumb: {
						label: "Approved Warehouses",
						alias: "Approved Warehouses",
					},
				},
			},
			{
				path: "approved/form",
				component: ApprovedFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Approved Warehouse Details",
					breadcrumb: {
						label: "Approved Warehouse Details",
						alias: "Approved Warehouse Details",
					},
				},
			},
			{
				path: "approved/form/:id",
				component: ApprovedFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Approved Warehouse Details",
					breadcrumb: {
						label: "Approved Warehouse Details",
						alias: "Approved Warehouse Details",
					},
				},
			},
			//--------Approved Warehouse Routes End--------//

			//--------Warehouse Type Routes--------//
			{
				path: "type/list",
				component: WarehouseTypeListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Warehouse Types",
					breadcrumb: {
						label: "Warehouse Types",
						alias: "Warehouse Types",
					},
				},
			},
			{
				path: "type/form",
				component: WarehouseTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Warehouse Type Details",
					breadcrumb: {
						label: "Warehouse Type Details",
						alias: "Warehouse Type Details",
					},
				},
			},
			{
				path: "type/form/:id",
				component: WarehouseTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Warehouse Type Details",
					breadcrumb: {
						label: "Warehouse Type Details",
						alias: "Warehouse Type Details",
					},
				},
			},
			//--------Warehouse Type Routes End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WarehouseRoutingModule { }
