import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchedulingQaRoutingModule} from './scheduling-qa-routing.module';
import {FarmerListComponent} from './farmer/list/farmer-list.component';
import {FarmerFormComponent} from './farmer/form/farmer-form.component';
import {WarehouseFarmerListComponent} from './warehouse-farmer/list/warehouse-farmer-list.component';
import {WarehouseFarmerFormComponent} from './warehouse-farmer/form/warehouse-farmer-form.component';
import {WarehouseCompanyListComponent} from './warehouse-company/list/warehouse-company-list.component';
import {WarehouseCompanyFormComponent} from './warehouse-company/form/warehouse-company-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {TimePipe} from '../../utility/pipes/time.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


@NgModule({
	declarations: [
		FarmerListComponent,
		FarmerFormComponent,
		WarehouseFarmerListComponent,
		WarehouseFarmerFormComponent,
		WarehouseCompanyListComponent,
		WarehouseCompanyFormComponent
	],
	imports: [
		CommonModule,
		SchedulingQaRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		TimePipe,
		MatExpansionModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDatepickerModule,
	]
})
export class SchedulingQaModule { }
