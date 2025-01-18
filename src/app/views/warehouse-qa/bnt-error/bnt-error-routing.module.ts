import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WarehouseListComponent} from './warehouse/list/warehouse-list.component';
import {WarehouseFormComponent} from './warehouse/form/warehouse-form.component';
import {WarehouseGaurdService} from '../../../services/route-access-services/warehouse.guard';

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
				redirectTo: "warehouse/list",
				pathMatch: "full",
			},

			//-------- Warehouse QA Routes --------//
			{
				path: "warehouse/list",
				canActivate: [WarehouseGaurdService],
				component: WarehouseListComponent,
				data: {
					title: "Warehouse QA",
					breadcrumb: {
						label: "Warehouse QA",
						alias: "Warehouse QA",
					},
				},
			},
			{
				path: "warehouse/form/:id",
				canActivate: [WarehouseGaurdService],
				component: WarehouseFormComponent,
				data: {
					title: "Warehouse QA",
					breadcrumb: {
						label: "Warehouse QA",
						alias: "Warehouse QA",
					},
				},
			},
			//-------- Warehouse QA End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BntErrorRoutingModule { }
