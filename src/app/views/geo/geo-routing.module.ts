import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CountryListComponent} from "./country/list/country-list.component";
import {CountryFormComponent} from "./country/form/country-form.component";
import {StateListComponent} from "./state/list/state-list.component";
import {StateFormComponent} from "./state/form/state-form.component";
import {DistrictListComponent} from "./district/list/district-list.component";
import {DistrictFormComponent} from "./district/form/district-form.component";
import {CityListComponent} from "./city/list/city-list.component";
import {CityFormComponent} from "./city/form/city-form.component";
import {RegionFormComponent} from "./region/form/region-form.component";
import {RegionListComponent} from "./region/list/region-list.component";
import {ContinentFormComponent} from "./continent/form/continent-form.component";
import {ContinentListComponent} from "./continent/list/continent-list.component";
import {GeoGaurdService} from "../../services/route-access-services/geo.guard";
import {PomListComponent} from "./pom/list/pom-list.component";
import {PomFormComponent} from "./pom/form/pom-form.component";
import {AuthGaurdService} from "../../services/auth-gaurd.service";

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Geo",
			breadcrumb: {
				alias: "Geo",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "continent/list",
				pathMatch: "full",
			},

			//--------Continent Routes--------//
			{
				path: "continent/list",
				component: ContinentListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Continents",
					breadcrumb: {
						label: "Continents",
						alias: "Continents",
					},
				},
			},
			{
				path: "continent/form",
				component: ContinentFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Continent Details",
					breadcrumb: {
						label: "Continent Details",
						alias: "Continent Details",
					},
				},
			},
			{
				path: "continent/form/:id",
				component: ContinentFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Continent Details",
					breadcrumb: {
						label: "Continent Details",
						alias: "Continent Details",
					},
				},
			},
			//--------Continent Routes End--------//

			//--------Country Routes--------//
			{
				path: "country/list",
				component: CountryListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Countries",
					breadcrumb: {
						label: "Countries",
						alias: "Countries",
					},
				},
			},
			{
				path: "country/form",
				component: CountryFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Country Details",
					breadcrumb: {
						label: "Country Details",
						alias: "Country Details",
					},
				},
			},
			{
				path: "country/form/:id",
				component: CountryFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Country Details",
					breadcrumb: {
						label: "Country Details",
						alias: "Country Details",
					},
				},
			},
			//--------Country Routes End--------//

			//--------Region Routes--------//
			{
				path: "region/list",
				component: RegionListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Regions",
					breadcrumb: {
						label: "Regions",
						alias: "Regions",
					},
				},
			},
			{
				path: "region/form",
				component: RegionFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Region Details",
					breadcrumb: {
						label: "Region Details",
						alias: "Region Details",
					},
				},
			},
			{
				path: "region/form/:id",
				component: RegionFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Region Details",
					breadcrumb: {
						label: "Region Details",
						alias: "Region Details",
					},
				},
			},
			//--------Region Routes End--------//

			//--------State Routes--------//
			{
				path: "state/list",
				component: StateListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "States",
					breadcrumb: {
						label: "States",
						alias: "States",
					},
				},
			},
			{
				path: "state/form",
				component: StateFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "State Details",
					breadcrumb: {
						label: "State Details",
						alias: "State Details",
					},
				},
			},
			{
				path: "state/form/:id",
				component: StateFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "State Details",
					breadcrumb: {
						label: "State Details",
						alias: "State Details",
					},
				},
			},
			//--------State Routes End--------//

			//--------District Routes--------//
			{
				path: "district/list",
				component: DistrictListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Districts",
					breadcrumb: {
						label: "Districts",
						alias: "Districts",
					},
				},
			},
			{
				path: "district/form",
				component: DistrictFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "District Details",
					breadcrumb: {
						label: "District Details",
						alias: "District Details",
					},
				},
			},
			{
				path: "district/form/:id",
				component: DistrictFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "District Details",
					breadcrumb: {
						label: "District Details",
						alias: "District Details",
					},
				},
			},
			//--------District Routes End--------//

			//--------City Routes--------//
			{
				path: "city/list",
				component: CityListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Cities",
					breadcrumb: {
						label: "Cities",
						alias: "Cities",
					},
				},
			},
			{
				path: "city/form",
				component: CityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "City Details",
					breadcrumb: {
						label: "City Details",
						alias: "City Details",
					},
				},
			},
			{
				path: "city/form/:id",
				component: CityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "City Details",
					breadcrumb: {
						label: "City Details",
						alias: "City Details",
					},
				},
			},
			//--------City Routes End--------//

			//--------POM Routes--------//
			{
				path: "pom/list",
				component: PomListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "POM's",
					breadcrumb: {
						label: "POM's",
						alias: "POM's",
					},
				},
			},
			{
				path: "pom/form",
				component: PomFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "POM Details",
					breadcrumb: {
						label: "POM Details",
						alias: "POM Details",
					},
				},
			},
			{
				path: "pom/form/:id",
				component: PomFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "POM Details",
					breadcrumb: {
						label: "POM Details",
						alias: "POM Details",
					},
				},
			},
			//--------POM Routes End--------//
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GeoRoutingModule { }
