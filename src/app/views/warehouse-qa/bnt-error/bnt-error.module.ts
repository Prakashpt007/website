import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BntErrorRoutingModule} from './bnt-error-routing.module';
import {WarehouseListComponent} from './warehouse/list/warehouse-list.component';
import {WarehouseFormComponent} from './warehouse/form/warehouse-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormbuilderComponent} from '../../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../../utility/listbuilder/listbuilder.component';
import {PaginationComponent} from '../../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../../utility/filterbuilder/filterbuilder.component';
import {MatSelectModule} from '@angular/material/select';
import {DocApproveRejectModalComponent} from '../../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';
import {SelectWithSearchComponent} from '../../../utility/form-controls/select-with-search/select-with-search.component';
import {DocModalComponent} from '../../../utility/doc-modal/doc-modal.component';


@NgModule({
	declarations: [
		WarehouseListComponent,
		WarehouseFormComponent
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
		DocApproveRejectModalComponent,
		DocModalComponent
	]
})
export class BntErrorModule { }
