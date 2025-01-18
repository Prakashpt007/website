import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BntErrorRoutingModule} from './bnt-error-routing.module';
import {TenderListComponent} from './tender/list/tender-list.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../../container/pagination/pagination.component';
import {DocApproveRejectModalComponent} from '../../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';
import {DocModalComponent} from '../../../utility/doc-modal/doc-modal.component';
import {FilterbuilderComponent} from '../../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../../utility/listbuilder/listbuilder.component';


@NgModule({
	declarations: [
		TenderListComponent,
	],
	imports: [
		CommonModule,
		BntErrorRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		DocModalComponent,
		DocApproveRejectModalComponent
	]
})
export class BntErrorModule { }
