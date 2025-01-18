import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InterventionRoutingModule} from './intervention-routing.module';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {MatSelectModule} from '@angular/material/select';
import {DocApproveRejectModalComponent} from '../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';
import {LocationPreviewComponent} from '../../utility/location-preview/location-preview.component';
import {BuyerDefaultManagementListComponent} from './buyer-default-management/list/buyer-default-management-list.component';
import {SellerDefaultManagementListComponent} from './seller-default-management/list/seller-default-management-list.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';


@NgModule({
	declarations: [
		BuyerDefaultManagementListComponent,
		SellerDefaultManagementListComponent,
	],
	imports: [
		CommonModule,
		InterventionRoutingModule,
		ListbuilderComponent,
		PaginationComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		DocApproveRejectModalComponent,
		LocationPreviewComponent,
		FormbuilderComponent,
		FilterbuilderComponent
	]
})
export class InterventionModule { }
