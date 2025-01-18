import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BankAccountListComponent} from './bank-account/list/bank-account-list.component';
import {BankAccountFormComponent} from './bank-account/form/bank-account-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {CompanyListComponent} from './company/list/company-list.component';
import {CompanyFormComponent} from './company/form/company-form.component';
import {LeasedLandFormComponent} from './leased/form/leased-land-form.component';
import {LeasedLandListComponent} from './leased/list/leased-land-list.component';
import {OwnedLandFormComponent} from './owned/form/owned-land-form.component';
import {OwnedLandListComponent} from './owned/list/owned-land-list.component';
import {DocApproveRejectModalComponent} from '../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';
import {FinanceQaRoutingModule} from './finance-qa-routing.module';
import { CompanyProofOfOrderListComponent } from './company-proof-of-order/list/company-proof-of-order-list.component';
import { CompanyProofOfOrderFormComponent } from './company-proof-of-order/form/company-proof-of-order-form.component';
import { CompanyTurnoverListComponent } from './company-turnover/list/company-turnover-list.component';
import { CompanyTurnoverFormComponent } from './company-turnover/form/company-turnover-form.component';


@NgModule({
	declarations: [
		BankAccountListComponent,
		BankAccountFormComponent,
		CompanyListComponent,
		CompanyFormComponent,
		OwnedLandListComponent,
		LeasedLandListComponent,
		OwnedLandFormComponent,
		LeasedLandFormComponent,
  CompanyProofOfOrderListComponent,
  CompanyProofOfOrderFormComponent,
  CompanyTurnoverListComponent,
  CompanyTurnoverFormComponent
	],
	imports: [
		CommonModule,
		FinanceQaRoutingModule,
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
export class FinanceQaModule { }
