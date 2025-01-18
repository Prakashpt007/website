import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyQaRoutingModule} from './company-qa-routing.module';
import {CompanyVerificationListComponent} from './company-verification/list/company-verification-list.component';
import {CompanyVerificationFormComponent} from './company-verification/form/company-verification-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {FlsDocApproveRejectModalComponent} from '../../utility/fls-doc-approve-reject-modal/fls-doc-approve-reject-modal.component';


@NgModule({
	declarations: [
		CompanyVerificationListComponent,
		CompanyVerificationFormComponent
	],
	imports: [
		CommonModule,
		CompanyQaRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		FlsDocApproveRejectModalComponent
	]
})
export class CompanyQaModule { }
