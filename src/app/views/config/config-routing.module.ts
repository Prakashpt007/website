import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvancePercentListComponent} from './advance-percent/list/advance-percent-list.component';
import {AdvancePercentFormComponent} from './advance-percent/form/advance-percent-form.component';
import {AuthGaurdService} from '../../services/auth-gaurd.service';
import {AuctionDurationListComponent} from './auction-duration/list/auction-duration-list.component';
import {AuctionDurationFormComponent} from './auction-duration/form/auction-duration-form.component';
import {PreQualDurationFormComponent} from './pre-qual-duration/form/pre-qual-duration-form.component';
import {PreQualDurationListComponent} from './pre-qual-duration/list/pre-qual-duration-list.component';
import {AgmListComponent} from './agm/list/agm-list.component';
import {AgmFormComponent} from './agm/form/agm-form.component';
import {DrkListComponent} from './drk/list/drk-list.component';
import {DrkFormComponent} from './drk/form/drk-form.component';
import {CommodityPmpDecreasePercentListComponent} from './commodity-pmp-decrease-percent/list/commodity-pmp-decrease-percent-list.component';
import {CommodityPmpDecreasePercentFormComponent} from './commodity-pmp-decrease-percent/form/commodity-pmp-decrease-percent-form.component';
import {DeltaMarginBandFormComponent} from './delta-margin-band/form/delta-margin-band-form.component';
import {DeltaMarginBandListComponent} from './delta-margin-band/list/delta-margin-band-list.component';
import {LotDefaultQuantityListComponent} from './lot-default-quantity/list/lot-default-quantity-list.component';
import {LotDefaultQuantityFormComponent} from './lot-default-quantity/form/lot-default-quantity-form.component';
import {ServiceChargeListComponent} from './service-charge/list/service-charge-list.component';
import {ServiceChargeFormComponent} from './service-charge/form/service-charge-form.component';
import {VisitDurationListComponent} from './visit-duration/list/visit-duration-list.component';
import {VisitDurationFormComponent} from './visit-duration/form/visit-duration-form.component';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Configuration",
			breadcrumb: {
				alias: "Configuration",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "advance-percent/list",
				pathMatch: "full",
			},

			//--------Advance Percent Routes--------//
			{
				path: "advance-percent/list",
				component: AdvancePercentListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Advance Percent",
					breadcrumb: {
						label: "Advance Percent",
						alias: "Advance Percent",
					},
				},
			},
			{
				path: "advance-percent/form",
				component: AdvancePercentFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Advance Percent",
					breadcrumb: {
						label: "Advance Percent",
						alias: "Advance Percent",
					},
				},
			},
			{
				path: "advance-percent/form/:id",
				component: AdvancePercentFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Advance Percent",
					breadcrumb: {
						label: "Advance Percent",
						alias: "Advance Percent",
					},
				},
			},
			//--------Advance Percent Routes End--------//

			//--------Auction Duration Routes--------//
			{
				path: "auction-duration/list",
				component: AuctionDurationListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Auction Duration",
					breadcrumb: {
						label: "Auction Duration",
						alias: "Auction Duration",
					},
				},
			},
			{
				path: "auction-duration/form",
				component: AuctionDurationFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Auction Duration",
					breadcrumb: {
						label: "Auction Duration",
						alias: "Auction Duration",
					},
				},
			},
			{
				path: "auction-duration/form/:id",
				component: AuctionDurationFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Auction Duration",
					breadcrumb: {
						label: "Auction Duration",
						alias: "Auction Duration",
					},
				},
			},
			//--------Auction Duration Routes End--------//

			//--------Pre-Qual Duration Routes--------//
			{
				path: "pre-qual-duration/list",
				component: PreQualDurationListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Pre-Qual Duration",
					breadcrumb: {
						label: "Pre-Qual Duration",
						alias: "Pre-Qual Duration",
					},
				},
			},
			{
				path: "pre-qual-duration/form",
				component: PreQualDurationFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Pre-Qual Duration",
					breadcrumb: {
						label: "Pre-Qual Duration",
						alias: "Pre-Qual Duration",
					},
				},
			},
			{
				path: "pre-qual-duration/form/:id",
				component: PreQualDurationFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Pre-Qual Duration",
					breadcrumb: {
						label: "Pre-Qual Duration",
						alias: "Pre-Qual Duration",
					},
				},
			},
			//--------Pre-Qual Duration Routes End--------//

			//-------AGM Routes--------//
			{
				path: "agm/list",
				component: AgmListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "AGM",
					breadcrumb: {
						label: "AGM",
						alias: "AGM",
					},
				},
			},
			{
				path: "agm/form",
				component: AgmFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "AGM",
					breadcrumb: {
						label: "AGM",
						alias: "AGM",
					},
				},
			},
			{
				path: "agm/form/:id",
				component: AgmFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "AGM",
					breadcrumb: {
						label: "AGM",
						alias: "AGM",
					},
				},
			},
			//-------AGM Routes End--------//

			//-------DRK Routes--------//
			{
				path: "drk/list",
				component: DrkListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "DRK",
					breadcrumb: {
						label: "DRK",
						alias: "DRK",
					},
				},
			},
			{
				path: "drk/form",
				component: DrkFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "DRK",
					breadcrumb: {
						label: "DRK",
						alias: "DRK",
					},
				},
			},
			{
				path: "drk/form/:id",
				component: DrkFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "DRK",
					breadcrumb: {
						label: "DRK",
						alias: "DRK",
					},
				},
			},
			//-------DRK Routes End--------//

			//-------Commodity PMP Decrease Percent Routes--------//
			{
				path: "commodity-pmp-decrease-percent/list",
				component: CommodityPmpDecreasePercentListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity PMP Decrease Percent",
					breadcrumb: {
						label: "Commodity PMP Decrease Percent",
						alias: "Commodity PMP Decrease Percent",
					},
				},
			},
			{
				path: "commodity-pmp-decrease-percent/form",
				component: CommodityPmpDecreasePercentFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity PMP Decrease Percent",
					breadcrumb: {
						label: "Commodity PMP Decrease Percent",
						alias: "Commodity PMP Decrease Percent",
					},
				},
			},
			{
				path: "commodity-pmp-decrease-percent/form/:id",
				component: CommodityPmpDecreasePercentFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity PMP Decrease Percent",
					breadcrumb: {
						label: "Commodity PMP Decrease Percent",
						alias: "Commodity PMP Decrease Percent",
					},
				},
			},
			//-------Commodity PMP Decrease Percent Routes End--------//

			//-------Delta Margin Band Routes--------//
			{
				path: "delta-margin-band/list",
				component: DeltaMarginBandListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Delta Margin Bands",
					breadcrumb: {
						label: "Delta Margin Bands",
						alias: "Delta Margin Bands",
					},
				},
			},
			{
				path: "delta-margin-band/form",
				component: DeltaMarginBandFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Delta Margin Band",
					breadcrumb: {
						label: "Delta Margin Band",
						alias: "Delta Margin Band",
					},
				},
			},
			{
				path: "delta-margin-band/form/:id",
				component: DeltaMarginBandFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Delta Margin Band",
					breadcrumb: {
						label: "Delta Margin Band",
						alias: "Delta Margin Band",
					},
				},
			},
			//-------Delta Margin Band Routes End--------//

			//-------Lot Default Quantity Routes--------//
			{
				path: "lot-default-quantity/list",
				component: LotDefaultQuantityListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Lot Default Quantities",
					breadcrumb: {
						label: "Lot Default Quantities",
						alias: "Lot Default Quantities",
					},
				},
			},
			{
				path: "lot-default-quantity/form",
				component: LotDefaultQuantityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Lot Default Quantity",
					breadcrumb: {
						label: "Lot Default Quantity",
						alias: "Lot Default Quantity",
					},
				},
			},
			{
				path: "lot-default-quantity/form/:id",
				component: LotDefaultQuantityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Lot Default Quantity",
					breadcrumb: {
						label: "Lot Default Quantity",
						alias: "Lot Default Quantity",
					},
				},
			},
			//-------Lot Default Quantity Routes End--------//

			//-------Service Charge Routes--------//
			{
				path: "service-charge/list",
				component: ServiceChargeListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Service Charges",
					breadcrumb: {
						label: "Service Charges",
						alias: "Service Charges",
					},
				},
			},
			{
				path: "service-charge/form",
				component: ServiceChargeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Service Charge",
					breadcrumb: {
						label: "Service Charge",
						alias: "Service Charge",
					},
				},
			},
			{
				path: "service-charge/form/:id",
				component: ServiceChargeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Service Charge",
					breadcrumb: {
						label: "Service Charge",
						alias: "Service Charge",
					},
				},
			},
			//-------Service Charge Routes End--------//

			//-------Visit Duration Routes--------//
			{
				path: "visit-duration/list",
				component: VisitDurationListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Visit Durations",
					breadcrumb: {
						label: "Visit Durations",
						alias: "Visit Durations",
					},
				},
			},
			{
				path: "visit-duration/form",
				component: VisitDurationFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Visit Duration",
					breadcrumb: {
						label: "Visit Duration",
						alias: "Visit Duration",
					},
				},
			},
			{
				path: "visit-duration/form/:id",
				component: VisitDurationFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Visit Duration",
					breadcrumb: {
						label: "Visit Duration",
						alias: "Visit Duration",
					},
				},
			},
			//-------Visit Duration Routes End--------//
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ConfigRoutingModule { }
