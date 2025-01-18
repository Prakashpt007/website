import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatError, MatSelectModule} from "@angular/material/select";
import {PaginationComponent} from "../../container/pagination/pagination.component";
import {FilterbuilderComponent} from "../../utility/filterbuilder/filterbuilder.component";
import {SelectWithSearchComponent} from "../../utility/form-controls/select-with-search/select-with-search.component";
import {FormbuilderComponent} from "../../utility/formbuilder/formbuilder.component";
import {ListbuilderComponent} from "../../utility/listbuilder/listbuilder.component";
import {AgriRoutingModule} from "./agri-routing.module";
import {CommodityModelFormComponent} from "./commodity-model/form/commodity-model-form.component";
import {CommodityModelListComponent} from "./commodity-model/list/commodity-model-list.component";
import {CommodityParameterFormComponent} from "./commodity-parameter/form/commodity-parameter-form.component";
import {CommodityParameterListComponent} from "./commodity-parameter/list/commodity-parameter-list.component";
import {CommodityFormComponent} from "./commodity/form/commodity-form.component";
import {CommodityListComponent} from "./commodity/list/commodity-list.component";
import {CropTypeFormComponent} from "./crop-type/form/crop-type-form.component";
import {CropTypeListComponent} from "./crop-type/list/crop-type-list.component";
import {ParameterFormComponent} from "./parameter/form/parameter-form.component";
import {ParameterListComponent} from "./parameter/list/parameter-list.component";
import {PhenophaseDurationFormComponent} from "./phenophase-duration/form/phenophase-duration-form.component";
import {PhenophaseDurationListComponent} from "./phenophase-duration/list/phenophase-duration-list.component";
import {PhenophaseFormComponent} from "./phenophase/form/phenophase-form.component";
import {PhenophaseListComponent} from "./phenophase/list/phenophase-list.component";
import {PlantpartColorFormComponent} from "./plantpart-color/form/plantpart-color-form.component";
import {PlantpartColorListComponent} from "./plantpart-color/list/plantpart-color-list.component";
import {QualityFormComponent} from "./quality/form/quality-form.component";
import {QualityListComponent} from "./quality/list/quality-list.component";
import {StateCommodityFormComponent} from "./state-commodity/form/state-commodity-form.component";
import {StateCommodityListComponent} from "./state-commodity/list/state-commodity-list.component";
import {VarietyFormComponent} from "./variety/form/variety-form.component";
import {VarietyListComponent} from "./variety/list/variety-list.component";
import {CommodityQualityParameterRangeListComponent} from './commodity-quality-parameter-range/list/commodity-quality-parameter-range-list.component';
import {CommodityQualityParameterRangeAddComponent} from './commodity-quality-parameter-range/add/commodity-quality-parameter-range-add.component';
import {CheckboxGroupComponent} from "../../utility/form-controls/checkbox-group/checkbox-group.component";
import {CommodityQualityParameterRangeEditComponent} from './commodity-quality-parameter-range/edit/commodity-quality-parameter-range-edit.component';
import { CommodityColorListComponent } from './commodity-color/list/commodity-color-list.component';
import { CommodityColorFormComponent } from './commodity-color/form/commodity-color-form.component';


@NgModule({
	declarations: [
		CommodityFormComponent,
		CommodityListComponent,
		CropTypeListComponent,
		CropTypeFormComponent,
		QualityFormComponent,
		QualityListComponent,
		StateCommodityListComponent,
		StateCommodityFormComponent,
		VarietyFormComponent,
		VarietyListComponent,
		ParameterFormComponent,
		ParameterListComponent,
		PhenophaseFormComponent,
		PhenophaseListComponent,
		PhenophaseDurationFormComponent,
		PhenophaseDurationListComponent,
		CommodityParameterFormComponent,
		CommodityParameterListComponent,
		CommodityModelFormComponent,
		CommodityModelListComponent,
		PlantpartColorFormComponent,
		PlantpartColorListComponent,
		CommodityQualityParameterRangeListComponent,
		CommodityQualityParameterRangeAddComponent,
		CommodityQualityParameterRangeEditComponent,
  CommodityColorListComponent,
  CommodityColorFormComponent,

	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AgriRoutingModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		CheckboxGroupComponent
	],
})
export class AgriModule { }
