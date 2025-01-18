import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TelecallerQaRoutingModule} from './telecaller-qa-routing.module';
import {LeadListComponent} from './lead/list/lead-list.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {DocApproveRejectModalComponent} from '../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {LeadViewModalComponent} from './lead/view-modal/lead-view-modal.component';
import {FormatTextPipe} from '../../utility/pipes/format-text.pipe';
import {AutosizeModule} from 'ngx-autosize';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CheckboxGroupComponent} from '../../utility/form-controls/checkbox-group/checkbox-group.component';
import {CheckboxComponent} from '../../utility/form-controls/checkbox/checkbox.component';
import {MatRadioModule} from "@angular/material/radio";
import {LeadFormComponent} from './lead/form/lead-form.component';
@NgModule({
	declarations: [
		LeadListComponent,
		LeadViewModalComponent,
		LeadFormComponent
	],
	imports: [
		CommonModule,
		TelecallerQaRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		DocApproveRejectModalComponent,
		FormatTextPipe,
		AutosizeModule,
		MatCheckboxModule,
		CheckboxGroupComponent,
		CheckboxComponent,
		MatRadioModule

	]
})
export class TelecallerQaModule { }
