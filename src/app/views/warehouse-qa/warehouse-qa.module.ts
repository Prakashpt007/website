import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompanyWarehouseListComponent} from './company/list/company-warehouse-list.component';
import {CompanyWarehouseFormComponent} from './company/form/company-warehouse-form.component';
import {FarmerWarehouseListComponent} from './farmer/list/farmer-warehouse-list.component';
import {FarmerWarehouseFormComponent} from './farmer/form/farmer-warehouse-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {DocApproveRejectModalComponent} from '../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {WarehouseQaRoutingModule} from './warehouse-qa-routing.module';


@NgModule({
	declarations: [
		CompanyWarehouseListComponent,
		CompanyWarehouseFormComponent,
		FarmerWarehouseListComponent,
		FarmerWarehouseFormComponent
	],
	imports: [
		CommonModule,
		WarehouseQaRoutingModule,
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
export class WarehouseQaModule { }
