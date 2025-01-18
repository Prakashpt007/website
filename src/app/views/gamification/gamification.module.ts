import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GamificationRoutingModule} from './gamification-routing.module';
import {CriteriaFormComponent} from './criteria/form/criteria-form.component';
import {CriteriaListComponent} from './criteria/list/criteria-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
// import {NgxMultipleDatesModule} from 'ngx-multiple-dates';
import {NgxPaginationModule} from 'ngx-pagination';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {BriefDetailsValidationComponent} from '../../utility/brief-details-validation/brief-details-validation.component';
import {BriefInfoTableComponent} from '../../utility/brief-info-table/brief-info-table.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {MultiselectWithSearchComponent} from '../../utility/form-controls/multiselect-with-search/multiselect-with-search.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';


@NgModule({
	declarations: [
		CriteriaFormComponent,
		CriteriaListComponent
	],
	imports: [
		CommonModule,
		GamificationRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		// NgxMultipleDatesModule,
		AutosizeModule,
		NgxMatSelectSearchModule,
		PaginationComponent,
		MultiselectWithSearchComponent,
		SelectWithSearchComponent,
		FilterbuilderComponent,
		ListbuilderComponent,
		BriefInfoTableComponent,
		BriefDetailsValidationComponent,
		FormbuilderComponent
	]
})
export class GamificationModule { }
