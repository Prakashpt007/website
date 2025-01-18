import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GeoPlotListComponent} from './geo-plot/list/geo-plot-list.component';
import {GeoPlotFormComponent} from './geo-plot/form/geo-plot-form.component';
import {HarvestedGeoTagFormComponent} from './harvested-geo-tag/form/harvested-geo-tag-form.component';
import {HarvestedGeoTagListComponent} from './harvested-geo-tag/list/harvested-geo-tag-list.component';
import {KmlGaurdService} from '../../services/route-access-services/kml.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Geo QA",
			breadcrumb: {
				alias: "Geo QA",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "geo-plot/list",
				pathMatch: "full",
			},

			//--------Geo Plot QA Routes--------//
			{
				path: "geo-plot/list",
				canActivate: [KmlGaurdService],
				component: GeoPlotListComponent,
				data: {
					title: "Geo QA",
					breadcrumb: {
						label: "Geo QA",
						alias: "Geo QA",
					},
				},
			},
			{
				path: "geo-plot/form/:id",
				canActivate: [KmlGaurdService],
				component: GeoPlotFormComponent,
				data: {
					title: "Geo QA",
					breadcrumb: {
						label: "Geo QA",
						alias: "Geo QA",
					},
				},
			},
			//--------Geo Plot QA End--------//

			//-------- Harvested Geo Tag QA Routes --------//
			{
				path: "harvested-geo-tag/list",
				canActivate: [KmlGaurdService],
				component: HarvestedGeoTagListComponent,
				data: {
					title: "Geo QA",
					breadcrumb: {
						label: "Geo QA",
						alias: "Geo QA",
					},
				},
			},
			{
				path: "harvested-geo-tag/form/:id",
				canActivate: [KmlGaurdService],
				component: HarvestedGeoTagFormComponent,
				data: {
					title: "Geo QA",
					breadcrumb: {
						label: "Geo QA",
						alias: "Geo QA",
					},
				},
			},
			//-------- Harvested Geo Tag QA Routes End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GeoQaRoutingModule { }
