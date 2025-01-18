import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FarmerFormComponent} from './farmer/form/farmer-form.component';
import {FarmerListComponent} from './farmer/list/farmer-list.component';
import {WarehouseFarmerFormComponent} from './warehouse-farmer/form/warehouse-farmer-form.component';
import {WarehouseFarmerListComponent} from './warehouse-farmer/list/warehouse-farmer-list.component';
import {WarehouseCompanyListComponent} from './warehouse-company/list/warehouse-company-list.component';
import {WarehouseCompanyFormComponent} from './warehouse-company/form/warehouse-company-form.component';
import {SchedulingGaurdService} from '../../services/route-access-services/scheduling.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Scheduling",
			breadcrumb: {
				alias: "Scheduling",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "farmer/list",
				pathMatch: "full",
			},

			//-------- Farmer Scheduling QA Routes --------//
			{
				path: "farmer/list",
				canActivate: [SchedulingGaurdService],
				component: FarmerListComponent,
				data: {
					title: "Scheduling",
					breadcrumb: {
						label: "Scheduling",
						alias: "Scheduling",
					},
				},
			},
			{
				path: "farmer/form/:id",
				canActivate: [SchedulingGaurdService],
				component: FarmerFormComponent,
				data: {
					title: "Scheduling",
					breadcrumb: {
						label: "Scheduling",
						alias: "Scheduling",
					},
				},
			},
			//-------- Farmer Scheduling QA End --------//

			//-------- Warehouse Farmer Scheduling QA Routes --------//
			{
				path: "warehouse-farmer/list",
				canActivate: [SchedulingGaurdService],
				component: WarehouseFarmerListComponent,
				data: {
					title: "Scheduling",
					breadcrumb: {
						label: "Scheduling",
						alias: "Scheduling",
					},
				},
			},
			{
				path: "warehouse-farmer/form/:id",
				canActivate: [SchedulingGaurdService],
				component: WarehouseFarmerFormComponent,
				data: {
					title: "Scheduling",
					breadcrumb: {
						label: "Scheduling",
						alias: "Scheduling",
					},
				},
			},
			//-------- Warehouse Farmer Scheduling QA End --------//

			//-------- Warehouse Company Scheduling QA Routes --------//
			{
				path: "warehouse-company/list",
				canActivate: [SchedulingGaurdService],
				component: WarehouseCompanyListComponent,
				data: {
					title: "Scheduling",
					breadcrumb: {
						label: "Scheduling",
						alias: "Scheduling",
					},
				},
			},
			{
				path: "warehouse-company/form/:id",
				canActivate: [SchedulingGaurdService],
				component: WarehouseCompanyFormComponent,
				data: {
					title: "Scheduling",
					breadcrumb: {
						label: "Scheduling",
						alias: "Scheduling",
					},
				},
			},
			//-------- Warehouse Company Scheduling QA End --------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SchedulingQaRoutingModule { }
