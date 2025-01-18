import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommodityListComponent} from "./commodity/list/commodity-list.component";
import {CommodityFormComponent} from "./commodity/form/commodity-form.component";
import {CropTypeListComponent} from "./crop-type/list/crop-type-list.component";
import {CropTypeFormComponent} from "./crop-type/form/crop-type-form.component";
import {StateCommodityFormComponent} from "./state-commodity/form/state-commodity-form.component";
import {StateCommodityListComponent} from "./state-commodity/list/state-commodity-list.component";
import {QualityListComponent} from "./quality/list/quality-list.component";
import {QualityFormComponent} from "./quality/form/quality-form.component";
import {VarietyFormComponent} from "./variety/form/variety-form.component";
import {VarietyListComponent} from "./variety/list/variety-list.component";
import {ParameterFormComponent} from "./parameter/form/parameter-form.component";
import {ParameterListComponent} from "./parameter/list/parameter-list.component";
import {PhenophaseFormComponent} from "./phenophase/form/phenophase-form.component";
import {PhenophaseListComponent} from "./phenophase/list/phenophase-list.component";
import {PhenophaseDurationListComponent} from "./phenophase-duration/list/phenophase-duration-list.component";
import {PhenophaseDurationFormComponent} from "./phenophase-duration/form/phenophase-duration-form.component";
import {CommodityParameterListComponent} from "./commodity-parameter/list/commodity-parameter-list.component";
import {CommodityParameterFormComponent} from "./commodity-parameter/form/commodity-parameter-form.component";
import {CommodityModelFormComponent} from "./commodity-model/form/commodity-model-form.component";
import {CommodityModelListComponent} from "./commodity-model/list/commodity-model-list.component";
import {PlantpartColorFormComponent} from "./plantpart-color/form/plantpart-color-form.component";
import {PlantpartColorListComponent} from "./plantpart-color/list/plantpart-color-list.component";
import {CommodityQualityParameterRangeListComponent} from "./commodity-quality-parameter-range/list/commodity-quality-parameter-range-list.component";
import {CommodityQualityParameterRangeAddComponent} from "./commodity-quality-parameter-range/add/commodity-quality-parameter-range-add.component";
import {CommodityQualityParameterRangeEditComponent} from "./commodity-quality-parameter-range/edit/commodity-quality-parameter-range-edit.component";
import {CommodityColorFormComponent} from "./commodity-color/form/commodity-color-form.component";
import {CommodityColorListComponent} from "./commodity-color/list/commodity-color-list.component";
import {AuthGaurdService} from "../../services/auth-gaurd.service";

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Agri",
			breadcrumb: {
				alias: "Agri",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "commodity/list",
				pathMatch: "full",
			},

			//--------Commodity Routes--------//
			{
				path: "commodity/list",
				component: CommodityListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodities",
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
				path: "commodity/form/:id",
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
			//--------Commodity Routes End--------//

			//--------Commodity Color Routes--------//
			{
				path: "commodity-color/list",
				component: CommodityColorListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Colors",
					breadcrumb: {
						label: "Commodity Colors",
						alias: "Commodity Colors",
					},
				},
			},
			{
				path: "commodity-color/form",
				component: CommodityColorFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Color Details",
					breadcrumb: {
						label: "Commodity Color Details",
						alias: "Commodity Color Details",
					},
				},
			},
			{
				path: "commodity-color/form/:id",
				component: CommodityColorFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Color Details",
					breadcrumb: {
						label: "Commodity Color Details",
						alias: "Commodity Color Details",
					},
				},
			},
			//--------Commodity Color Routes End--------//

			//--------Crop Type Routes--------//
			{
				path: "crop-type/list",
				component: CropTypeListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Crop Types",
					breadcrumb: {
						label: "Crop Types",
						alias: "Crop Types",
					},
				},
			},
			{
				path: "crop-type/form",
				component: CropTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Crop Type Details",
					breadcrumb: {
						label: "Crop Type Details",
						alias: "Crop Type Details",
					},
				},
			},
			{
				path: "crop-type/form/:id",
				component: CropTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Crop Type Details",
					breadcrumb: {
						label: "Crop Type Details",
						alias: "Crop Type Details",
					},
				},
			},
			//--------Crop Type Routes End--------//

			//--------State Commodity Routes--------//
			{
				path: "state-commodity/list",
				component: StateCommodityListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "State Commodities",
					breadcrumb: {
						label: "State Commodities",
						alias: "State Commodities",
					},
				},
			},
			{
				path: "state-commodity/form",
				component: StateCommodityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "State Commodity Details",
					breadcrumb: {
						label: "State Commodity Details",
						alias: "State Commodity Details",
					},
				},
			},
			{
				path: "state-commodity/form/:id",
				component: StateCommodityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "State Commodity Details",
					breadcrumb: {
						label: "State Commodity Details",
						alias: "State Commodity Details",
					},
				},
			},
			//--------State Commodity Routes End--------//

			//--------Quality Routes--------//
			{
				path: "quality/list",
				component: QualityListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Qualities",
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
					title: "Quality Details",
					breadcrumb: {
						label: "Quality Details",
						alias: "Quality Details",
					},
				},
			},
			{
				path: "quality/form/:id",
				component: QualityFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Quality Details",
					breadcrumb: {
						label: "Quality Details",
						alias: "Quality Details",
					},
				},
			},
			//--------Quality Routes End--------//

			//--------Variety Routes--------//
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
					title: "Variety Details",
					breadcrumb: {
						label: "Variety Details",
						alias: "Variety Details",
					},
				},
			},
			{
				path: "variety/form/:id",
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
			//--------Variety Routes End--------//

			//--------Parameter Routes--------//
			{
				path: "parameter/list",
				component: ParameterListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Parameters",
					breadcrumb: {
						label: "Parameters",
						alias: "Parameters",
					},
				},
			},
			{
				path: "parameter/form",
				component: ParameterFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Parameter Details",
					breadcrumb: {
						label: "Parameter Details",
						alias: "Parameter Details",
					},
				},
			},
			{
				path: "parameter/form/:id",
				component: ParameterFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Parameter Details",
					breadcrumb: {
						label: "Parameter Details",
						alias: "Parameter Details",
					},
				},
			},
			//--------Parameter Routes End--------//

			//--------Phenophase Routes--------//
			{
				path: "phenophase/list",
				component: PhenophaseListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Phenophases",
					breadcrumb: {
						label: "Phenophases",
						alias: "Phenophases",
					},
				},
			},
			{
				path: "phenophase/form",
				component: PhenophaseFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Phenophase Details",
					breadcrumb: {
						label: "Phenophase Details",
						alias: "Phenophase Details",
					},
				},
			},
			{
				path: "phenophase/form/:id",
				component: PhenophaseFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Phenophase Details",
					breadcrumb: {
						label: "Phenophase Details",
						alias: "Phenophase Details",
					},
				},
			},
			//--------Phenophase Routes End--------//

			//--------Phenophase Duration Routes--------//
			{
				path: "phenophase-duration/list",
				component: PhenophaseDurationListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Phenophase Durations",
					breadcrumb: {
						label: "Phenophase Durations",
						alias: "Phenophase Durations",
					},
				},
			},
			{
				path: "phenophase-duration/form",
				component: PhenophaseDurationFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Phenophase Duration Details",
					breadcrumb: {
						label: "Phenophase Duration Details",
						alias: "Phenophase Duration Details",
					},
				},
			},
			{
				path: "phenophase-duration/form/:id",
				component: PhenophaseDurationFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Phenophase Duration Details",
					breadcrumb: {
						label: "Phenophase Duration Details",
						alias: "Phenophase Duration Details",
					},
				},
			},
			//--------Phenophase Duration Routes End--------//

			//--------Commodity Parameter Routes--------//
			{
				path: "commodity-parameter/list",
				component: CommodityParameterListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Parameters",
					breadcrumb: {
						label: "Commodity Parameters",
						alias: "Commodity Parameters",
					},
				},
			},
			{
				path: "commodity-parameter/form",
				component: CommodityParameterFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Parameter Details",
					breadcrumb: {
						label: "Commodity Parameter Details",
						alias: "Commodity Parameter Details",
					},
				},
			},
			{
				path: "commodity-parameter/form/:id",
				component: CommodityParameterFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Parameter Details",
					breadcrumb: {
						label: "Commodity Parameter Details",
						alias: "Commodity Parameter Details",
					},
				},
			},
			//--------Commodity Parameter Routes End--------//

			//--------Commodity Model Routes--------//
			{
				path: "commodity-model/list",
				component: CommodityModelListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Models",
					breadcrumb: {
						label: "Commodity Models",
						alias: "Commodity Models",
					},
				},
			},
			{
				path: "commodity-model/form",
				component: CommodityModelFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Model Details",
					breadcrumb: {
						label: "Commodity Model Details",
						alias: "Commodity Model Details",
					},
				},
			},
			{
				path: "commodity-model/form/:id",
				component: CommodityModelFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Model Details",
					breadcrumb: {
						label: "Commodity Model Details",
						alias: "Commodity Model Details",
					},
				},
			},
			//--------Commodity Model Routes End--------//

			//--------Plant-Part Color Routes--------//
			{
				path: "plantpart-color/list",
				component: PlantpartColorListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Plant-Parts Color",
					breadcrumb: {
						label: "Plant-Parts Color",
						alias: "Plant-Parts Color",
					},
				},
			},
			{
				path: "plantpart-color/form",
				component: PlantpartColorFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Plant-Part Color Details",
					breadcrumb: {
						label: "Plant-Part Color Details",
						alias: "Plant-Part Color Details",
					},
				},
			},
			{
				path: "plantpart-color/form/:id",
				component: PlantpartColorFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Plant-Part Color Details",
					breadcrumb: {
						label: "Plant-Part Color Details",
						alias: "Plant-Part Color Details",
					},
				},
			},
			//--------Plant-Part Color Routes End--------//

			//--------Quality Parameter Range Routes--------//
			{
				path: "quality-parameter-range/list",
				component: CommodityQualityParameterRangeListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Quality Parameter Ranges",
					breadcrumb: {
						label: "Quality Parameter Ranges",
						alias: "Quality Parameter Ranges",
					},
				},
			},
			{
				path: "quality-parameter-range/add",
				component: CommodityQualityParameterRangeAddComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Quality Parameter Range Details",
					breadcrumb: {
						label: "Quality Parameter Range Details",
						alias: "Quality Parameter Range Details",
					},
				},
			},
			{
				path: "quality-parameter-range/edit/:id",
				component: CommodityQualityParameterRangeEditComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Quality Parameter Range Details",
					breadcrumb: {
						label: "Quality Parameter Range Details",
						alias: "Quality Parameter Range Details",
					},
				},
			},
			//--------Quality Parameter Range Routes End--------//
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AgriRoutingModule { }
