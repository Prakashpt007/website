import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {RegionalRoutingModule} from './regional-routing.module';
import {CommodityPriceFormComponent} from './commodity-price/form/commodity-price-form.component';
import {CommodityPriceListComponent} from './commodity-price/list/commodity-price-list.component';
import {CommoditySpecListComponent} from './commodity-spec/list/commodity-spec-list.component';
import {CommoditySpecFormComponent} from './commodity-spec/form/commodity-spec-form.component';
import {VarietyListComponent} from './variety/list/variety-list.component';
import {VarietyFormComponent} from './variety/form/variety-form.component';
import {QualityFormComponent} from './quality/form/quality-form.component';
import {RepresentCommodityListComponent} from './represent-commodity/list/represent-commodity-list.component';
import {RepresentCommodityFormComponent} from './represent-commodity/form/represent-commodity-form.component';
import {CommodityListComponent} from './commodity/list/commodity-list.component';
import {CommodityFormComponent} from './commodity/form/commodity-form.component';
import {QualityListComponent} from './quality/list/quality-list.component';
import {VisitDayFormComponent} from './visit-day/form/visit-day-form.component';
import {VisitDayListComponent} from './visit-day/list/visit-day-list.component';
import {VisitTimeFormComponent} from './visit-time/form/visit-time-form.component';
import {VisitTimeListComponent} from './visit-time/list/visit-time-list.component';

@NgModule({
	declarations: [
		VisitDayFormComponent,
		VisitDayListComponent,
		VisitTimeFormComponent,
		VisitTimeListComponent,
		CommodityPriceFormComponent,
		CommodityPriceListComponent,
		CommoditySpecListComponent,
		CommoditySpecFormComponent,
		VarietyListComponent,
		VarietyFormComponent,
		QualityListComponent,
		QualityFormComponent,
		RepresentCommodityListComponent,
		RepresentCommodityFormComponent,
		CommodityListComponent,
		CommodityFormComponent
	],
	imports: [
		CommonModule,
		RegionalRoutingModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent
	]
})
export class RegionalModule { }
