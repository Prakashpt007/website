import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConfigRoutingModule} from './config-routing.module';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {AdvancePercentListComponent} from './advance-percent/list/advance-percent-list.component';
import {AdvancePercentFormComponent} from './advance-percent/form/advance-percent-form.component';
import {PreQualDurationListComponent} from './pre-qual-duration/list/pre-qual-duration-list.component';
import {PreQualDurationFormComponent} from './pre-qual-duration/form/pre-qual-duration-form.component';
import {AuctionDurationListComponent} from './auction-duration/list/auction-duration-list.component';
import {AuctionDurationFormComponent} from './auction-duration/form/auction-duration-form.component';
import {CommodityPmpDecreasePercentListComponent} from './commodity-pmp-decrease-percent/list/commodity-pmp-decrease-percent-list.component';
import {CommodityPmpDecreasePercentFormComponent} from './commodity-pmp-decrease-percent/form/commodity-pmp-decrease-percent-form.component';
import {DrkListComponent} from './drk/list/drk-list.component';
import {DrkFormComponent} from './drk/form/drk-form.component';
import {AgmListComponent} from './agm/list/agm-list.component';
import {AgmFormComponent} from './agm/form/agm-form.component';
import {DeltaMarginBandListComponent} from './delta-margin-band/list/delta-margin-band-list.component';
import {DeltaMarginBandFormComponent} from './delta-margin-band/form/delta-margin-band-form.component';
import {LotDefaultQuantityListComponent} from './lot-default-quantity/list/lot-default-quantity-list.component';
import {LotDefaultQuantityFormComponent} from './lot-default-quantity/form/lot-default-quantity-form.component';
import {ServiceChargeListComponent} from './service-charge/list/service-charge-list.component';
import {ServiceChargeFormComponent} from './service-charge/form/service-charge-form.component';
import {VisitDurationListComponent} from './visit-duration/list/visit-duration-list.component';
import {VisitDurationFormComponent} from './visit-duration/form/visit-duration-form.component';


@NgModule({
	declarations: [
		AdvancePercentListComponent,
		AdvancePercentFormComponent,
		PreQualDurationListComponent,
		PreQualDurationFormComponent,
		AuctionDurationListComponent,
		AuctionDurationFormComponent,
		CommodityPmpDecreasePercentListComponent,
		CommodityPmpDecreasePercentFormComponent,
		DrkListComponent,
		DrkFormComponent,
		AgmListComponent,
		AgmFormComponent,
		DeltaMarginBandListComponent,
		DeltaMarginBandFormComponent,
		LotDefaultQuantityListComponent,
		LotDefaultQuantityFormComponent,
		ServiceChargeListComponent,
		ServiceChargeFormComponent,
		VisitDurationListComponent,
		VisitDurationFormComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		ConfigRoutingModule
	]
})
export class ConfigModule { }
