import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGaurdService} from '../../services/auth-gaurd.service';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Admin",
			breadcrumb: {
				alias: "Admin",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "bnt-error",
				pathMatch: "full",
			},

			//--------B&T Error Route--------//
			{
				path: "bnt-error",
				loadChildren: () => import("./bnt-error/bnt-error.module").then((m) => m.BntErrorModule)
			},
			//--------B&T Error End--------//
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
