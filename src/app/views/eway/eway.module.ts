import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {PendingListComponent} from './pending/list/pending-list.component';
import {ActiveListComponent} from './active/list/active-list.component';
import {EWayRoutingModule} from './eway-routing.module';
import {PendingFormComponent} from './pending/form/pending-form.component';
import {ActiveFormComponent} from './active/form/active-form.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {FormatLabelPipe} from "../../utility/pipes/format-label.pipe";
import {RawFormbuilderComponent} from "../../utility/raw-formbuilder/raw-formbuilder.component";


@NgModule({
	declarations: [
		PendingListComponent,
		ActiveListComponent,
		PendingFormComponent,
		ActiveFormComponent

	],
	imports: [
		CommonModule,
		EWayRoutingModule,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		FormbuilderComponent,
		FormatLabelPipe,
		RawFormbuilderComponent
	]
})
export class EWayModule { }
