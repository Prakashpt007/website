import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicKycRoutingModule} from './basic-kyc-routing.module';
import {UserKycListComponent} from './user-kyc/list/user-kyc-list.component';
import {UserKycFormComponent} from './user-kyc/form/user-kyc-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {DocApproveRejectModalComponent} from '../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';


@NgModule({
	declarations: [
		UserKycListComponent,
		UserKycFormComponent
	],
	imports: [
		CommonModule,
		BasicKycRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		DocApproveRejectModalComponent
	]
})
export class BasicKycModule { }
