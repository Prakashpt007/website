import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BntErrorRoutingModule} from './bnt-error-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../../utility/listbuilder/listbuilder.component';
import {UserKycFormComponent} from './user-kyc/form/user-kyc-form.component';
import {UserKycListComponent} from './user-kyc/list/user-kyc-list.component';
import {DocModalComponent} from '../../../utility/doc-modal/doc-modal.component';


@NgModule({
	declarations: [
		UserKycListComponent,
		UserKycFormComponent
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
		DocModalComponent
	]
})
export class BntErrorModule { }
