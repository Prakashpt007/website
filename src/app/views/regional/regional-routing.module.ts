import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGaurdService} from '../../services/auth-gaurd.service';
import {VarietyListComponent} from './variety/list/variety-list.component';
import {VarietyFormComponent} from './variety/form/variety-form.component';
import {QualityFormComponent} from './quality/form/quality-form.component';
import {QualityListComponent} from './quality/list/quality-list.component';
import {CommodityListComponent} from './commodity/list/commodity-list.component';
import {CommodityFormComponent} from './commodity/form/commodity-form.component';
import {RepresentCommodityListComponent} from './represent-commodity/list/represent-commodity-list.component';
import {RepresentCommodityFormComponent} from './represent-commodity/form/represent-commodity-form.component';
import {CommoditySpecListComponent} from './commodity-spec/list/commodity-spec-list.component';
import {CommoditySpecFormComponent} from './commodity-spec/form/commodity-spec-form.component';
import {CommodityPriceListComponent} from './commodity-price/list/commodity-price-list.component';
import {CommodityPriceFormComponent} from './commodity-price/form/commodity-price-form.component';
import {VisitDayListComponent} from './visit-day/list/visit-day-list.component';
import {VisitDayFormComponent} from './visit-day/form/visit-day-form.component';
import {VisitTimeFormComponent} from './visit-time/form/visit-time-form.component';
import {VisitTimeListComponent} from './visit-time/list/visit-time-list.component';


const routes: Routes = [
	{
		path: "",
		data: {
			title: "Gen",
			breadcrumb: {
				alias: "Gen",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "bank/list",
				pathMatch: "full",
			},

			//-------- Variety Routes--------//
			{
				path: "variety/list",
				component: VarietyListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Varieties",
					breadcrumb: {
						label: "Varieties",
						alias: "Varieties",
					},
				},
			},
			{
				path: "variety/form",
				component: VarietyFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: " Variety Details",
					breadcrumb: {
						label: "Variety Details",
						alias: "Variety Details",
					},
				},
			},
			{
				path: "variety/form/:id_1/:id_2/:id_3",
				component: VarietyFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Variety Details",
					breadcrumb: {
						label: "Variety Details",
						alias: "Variety Details",
					},
				},
			},
			//-------- Variety End--------//

			//-------- Quality Routes--------//
			{
				path: "quality/list",
				component: QualityListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: " Qualities",
					breadcrumb: {
						label: "Qualities",
						alias: "Qualities",
					},
				},
			},
			{
				path: "quality/form",
				component: QualityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: " Quality Details",
					breadcrumb: {
						label: "Quality Details",
						alias: "Quality Details",
					},
				},
			},
			{
				path: "quality/form/:id_1/:id_2/:id_3",
				component: QualityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: " Quality Details",
					breadcrumb: {
						label: "Quality Details",
						alias: "Quality Details",
					},
				},
			},
			//-------- Quality End--------//

			//-------- Commodity Routes--------//
			{
				path: "commodity/list",
				component: CommodityListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: " Commodities",
					breadcrumb: {
						label: "Commodities",
						alias: "Commodities",
					},
				},
			},
			{
				path: "commodity/form",
				component: CommodityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Details",
					breadcrumb: {
						label: "Commodity Details",
						alias: "Commodity Details",
					},
				},
			},
			{
				path: "commodity/form/:id_1/:id_2",
				component: CommodityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Details",
					breadcrumb: {
						label: "Commodity Details",
						alias: "Commodity Details",
					},
				},
			},
			//-------- Commodity End--------//

			//--------Represent  Commodity Routes--------//
			{
				path: "represent-commodity/list",
				component: RepresentCommodityListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Represent Commodities",
					breadcrumb: {
						label: "Represent Commodities",
						alias: "Represent Commodities",
					},
				},
			},
			{
				path: "represent-commodity/form",
				component: RepresentCommodityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Represent Commodity Details",
					breadcrumb: {
						label: "Represent Commodity Details",
						alias: "Represent Commodity Details",
					},
				},
			},
			{
				path: "represent-commodity/form/:id_1/:id_2",
				component: RepresentCommodityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Represent Commodity Details",
					breadcrumb: {
						label: "Represent Commodity Details",
						alias: "Represent Commodity Details",
					},
				},
			},
			//--------Represent  Commodity End--------//


			//--------Commodity Price Routes--------//
			{
				path: "commodity-price/list",
				component: CommodityPriceListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Prices",
					breadcrumb: {
						label: "Commodity Prices",
						alias: "Commodity Prices",
					},
				},
			},
			{
				path: "commodity-price/form",
				component: CommodityPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Price Details",
					breadcrumb: {
						label: "Commodity Price Details",
						alias: "Commodity Price Details",
					},
				},
			},
			{
				path: "commodity-price/form/:id",
				component: CommodityPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Price Details",
					breadcrumb: {
						label: "Commodity Price Details",
						alias: "Commodity Price Details",
					},
				},
			},
			//--------Commodity Price End--------//

			//--------Commodity Spec Routes--------//
			{
				path: "commodity-spec/list",
				component: CommoditySpecListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Specs",
					breadcrumb: {
						label: "Commodity Specs",
						alias: "Commodity Specs",
					},
				},
			},
			{
				path: "commodity-spec/form",
				component: CommoditySpecFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Spec Details",
					breadcrumb: {
						label: "Commodity Spec Details",
						alias: "Commodity Spec Details",
					},
				},
			},
			{
				path: "commodity-spec/form/:id",
				component: CommoditySpecFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Spec Details",
					breadcrumb: {
						label: "Commodity Spec Details",
						alias: "Commodity Spec Details",
					},
				},
			},
			//--------Commodity Spec End--------//

			//--------Visit Day Routes--------//
			{
				path: "visit-day/list",
				component: VisitDayListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Visit Days",
					breadcrumb: {
						label: "Visit Days",
						alias: "Visit Days",
					},
				},
			},
			{
				path: "visit-day/form",
				component: VisitDayFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Visit Day",
					breadcrumb: {
						label: "Visit Day",
						alias: "Visit Day",
					},
				},
			},
			{
				path: "visit-day/form/:id",
				component: VisitDayFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Visit Day",
					breadcrumb: {
						label: "Reginal Visit Day",
						alias: "Visit Day",
					},
				},
			},
			//--------Visit Day Routes End--------//



			//--------Visit Time Routes--------//
			{
				path: "visit-time/list",
				component: VisitTimeListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Visit Time",
					breadcrumb: {
						label: "Visit Time",
						alias: "Visit Time",
					},
				},
			},
			{
				path: "visit-time/form",
				component: VisitTimeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Visit Time",
					breadcrumb: {
						label: "Visit Time",
						alias: "Visit Time",
					},
				},
			},
			{
				path: "visit-time/form/:id",
				component: VisitTimeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Visit Time",
					breadcrumb: {
						label: "Reginal Visit Time",
						alias: "Visit Time",
					},
				},
			},
			//--------Visit Time Routes End--------//
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RegionalRoutingModule { }
