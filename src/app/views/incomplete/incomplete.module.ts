import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IncompleteRoutingModule} from './incomplete-routing.module';
import {PendingListComponent} from './pending/list/pending-list.component';
import {PendingFormComponent} from './pending/form/pending-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import { UnpaidListComponent } from './unpaid/list/unpaid-list.component';
import { UnpaidFormComponent } from './unpaid/form/unpaid-form.component';


@NgModule({
	declarations: [
		PendingListComponent,
		PendingFormComponent,
  UnpaidListComponent,
  UnpaidFormComponent
	],
	imports: [
		CommonModule,
		IncompleteRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
	]
})
export class IncompleteModule { }
