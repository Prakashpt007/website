import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BntErrorRoutingModule} from './bnt-error-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../../container/pagination/pagination.component';
import {DocModalComponent} from '../../../utility/doc-modal/doc-modal.component';
import {FilterbuilderComponent} from '../../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../../utility/listbuilder/listbuilder.component';
import {BankAccountListComponent} from './bank-account/list/bank-account-list.component';
import {BankAccountFormComponent} from './bank-account/form/bank-account-form.component';
import {CompanyListComponent} from './company/list/company-list.component';
import {CompanyFormComponent} from './company/form/company-form.component';
import {OwnedLandListComponent} from './owned/list/owned-land-list.component';
import {LeasedLandListComponent} from './leased/list/leased-land-list.component';
import {OwnedLandFormComponent} from './owned/form/owned-land-form.component';
import {LeasedLandFormComponent} from './leased/form/leased-land-form.component';
import {DocApproveRejectModalComponent} from '../../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';


@NgModule({
	declarations: [
		BankAccountListComponent,
		BankAccountFormComponent,
		CompanyListComponent,
		CompanyFormComponent,
		OwnedLandListComponent,
		LeasedLandListComponent,
		OwnedLandFormComponent,
		LeasedLandFormComponent
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
