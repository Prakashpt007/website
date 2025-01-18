import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WarehouseRoutingModule} from './warehouse-routing.module';
import {ApprovedListComponent} from './approved/list/approved-list.component';
import {ApprovedFormComponent} from './approved/form/approved-form.component';
import {PendingListComponent} from './pending/list/pending-list.component';
import {PendingFormComponent} from './pending/form/pending-form.component';

import {WarehouseTypeFormComponent} from './warehouse-type/form/warehouse-type-form.component';
import {WarehouseTypeListComponent} from './warehouse-type/list/warehouse-type-list.component';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {ApprovedViewModalComponent} from './approved/view-modal/approved-view-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RawFormbuilderComponent} from '../../utility/raw-formbuilder/raw-formbuilder.component';
import {FormatTextPipe} from "../../utility/pipes/format-text.pipe";


@NgModule({
	declarations: [
		ApprovedListComponent,
		ApprovedFormComponent,
		PendingListComponent,
		PendingFormComponent,
		WarehouseTypeFormComponent,
		WarehouseTypeListComponent,
		ApprovedViewModalComponent
	],
	imports: [
		CommonModule,
		WarehouseRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		RawFormbuilderComponent,
		FormatTextPipe
	]
})
export class WarehouseModule { }
