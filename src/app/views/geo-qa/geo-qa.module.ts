import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeoQaRoutingModule} from './geo-qa-routing.module';
import {GeoPlotListComponent} from './geo-plot/list/geo-plot-list.component';
import {GeoPlotFormComponent} from './geo-plot/form/geo-plot-form.component';
import {HarvestedGeoTagListComponent} from './harvested-geo-tag/list/harvested-geo-tag-list.component';
import {HarvestedGeoTagFormComponent} from './harvested-geo-tag/form/harvested-geo-tag-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {DocApproveRejectModalComponent} from '../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {KmlPreviewComponent} from '../../utility/kml-preview/kml-preview.component';
import {LocationPreviewComponent} from '../../utility/location-preview/location-preview.component';


@NgModule({
	declarations: [
		GeoPlotListComponent,
		GeoPlotFormComponent,
		HarvestedGeoTagListComponent,
		HarvestedGeoTagFormComponent,
	],
	imports: [
		CommonModule,
		GeoQaRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		DocApproveRejectModalComponent,
		KmlPreviewComponent,
		LocationPreviewComponent
	]
})
export class GeoQaModule { }
