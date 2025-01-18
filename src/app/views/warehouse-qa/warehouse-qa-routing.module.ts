import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyWarehouseListComponent} from './company/list/company-warehouse-list.component';
import {CompanyWarehouseFormComponent} from './company/form/company-warehouse-form.component';
import {FarmerWarehouseFormComponent} from './farmer/form/farmer-warehouse-form.component';
import {FarmerWarehouseListComponent} from './farmer/list/farmer-warehouse-list.component';
import {WarehouseGaurdService} from '../../services/route-access-services/warehouse.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Warehouse QA",
			breadcrumb: {
				alias: "Warehouse QA",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "company-warehouse/list",
				pathMatch: "full",
			},

			//-------- Company Warehouse QA Routes --------//
			{
				path: "company-warehouse/list",
				canActivate: [WarehouseGaurdService],
				component: CompanyWarehouseListComponent,
				data: {
					title: "Warehouse QA",
					breadcrumb: {
						label: "Warehouse QA",
						alias: "Warehouse QA",
					},
				},
			},
			{
				path: "company-warehouse/form/:id",
				canActivate: [WarehouseGaurdService],
				component: CompanyWarehouseFormComponent,
				data: {
					title: "Warehouse QA",
					breadcrumb: {
						label: "Warehouse QA",
						alias: "Warehouse QA",
					},
				},
			},
			//-------- Company Warehouse QA End--------//


			//-------- Farmer Warehouse QA Routes --------//
			{
				path: "farmer-warehouse/list",
				canActivate: [WarehouseGaurdService],
				component: FarmerWarehouseListComponent,
				data: {
					title: "Warehouse QA",
					breadcrumb: {
						label: "Warehouse QA",
						alias: "Warehouse QA",
					},
				},
			},
			{
				path: "farmer-warehouse/form/:id",
				canActivate: [WarehouseGaurdService],
				component: FarmerWarehouseFormComponent,
				data: {
					title: "Warehouse QA",
					breadcrumb: {
						label: "Warehouse QA",
						alias: "Warehouse QA",
					},
				},
			},
			//-------- Farmer Warehouse QA End--------//

			//--------B&T Error Route--------//
			{
				path: "bnt-error",
				loadChildren: () => import("./bnt-error/bnt-error.module").then((m) => m.BntErrorModule)
			},
			//--------B&T Error End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WarehouseQaRoutingModule { }
