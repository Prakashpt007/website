import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HrDepartmentRoutingModule} from './hr-department-routing.module';
import {EmployeeDetailsComponent} from './employee/details/employee-details.component';
import {EmployeeListComponent} from './employee/list/employee-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {RawFormbuilderComponent} from '../../utility/raw-formbuilder/raw-formbuilder.component';
import {MatTab, MatTabGroup, MatTabLabel} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
	declarations: [
		EmployeeDetailsComponent,
		EmployeeListComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		RawFormbuilderComponent,
		MatTab,
		MatTabGroup,
		MatTabLabel,
		MatFormFieldModule,
		HrDepartmentRoutingModule
	]
})
export class HrDepartmentModule { }
