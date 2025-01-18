import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertRoutingModule} from './alert-routing.module';
import {ChannelListComponent} from './channel/list/channel-list.component';
import {ChannelFormComponent} from './channel/form/channel-form.component';
import {AlertListComponent} from './alert/list/alert-list.component';
import {AlertFormComponent} from './alert/form/alert-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {DocApproveRejectModalComponent} from '../../utility/doc-approve-reject-modal/doc-approve-reject-modal.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {SelectWithSearchComponent} from '../../utility/form-controls/select-with-search/select-with-search.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {CheckboxComponent} from '../../utility/form-controls/checkbox/checkbox.component';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {TemplateListComponent} from './template/list/template-list.component';
import {TemplateFormComponent} from './template/form/template-form.component';
import {TemplateVariableListComponent} from './template-variable/list/template-variable-list.component';
import {TemplateVariableFormComponent} from './template-variable/form/template-variable-form.component';
import {NgStandardEditorComponent} from '../../utility/editors/ng-standard-editor/ng-standard-editor.component';
import {NgBasicEditorComponent} from '../../utility/editors/ng-basic-editor/ng-basic-editor.component';
import {NgProEditorComponent} from '../../utility/editors/ng-pro-editor/ng-pro-editor.component';
import {NgEliteEditorComponent} from '../../utility/editors/ng-elite-editor/ng-elite-editor.component';
import {TextEditorComponent} from "../../utility/editors/text-editor/text-editor.component";


@NgModule({
	declarations: [
		ChannelListComponent,
		ChannelFormComponent,
		AlertListComponent,
		AlertFormComponent,
		TemplateListComponent,
		TemplateFormComponent,
		TemplateVariableListComponent,
		TemplateVariableFormComponent
	],
	imports: [
		CommonModule,
		AlertRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		SelectWithSearchComponent,
		MatSelectModule,
		DocApproveRejectModalComponent,
		CheckboxComponent,
		MatInputModule,
		MatTabsModule,
		///--------------------//
		NgBasicEditorComponent,
		NgStandardEditorComponent,
		NgProEditorComponent,
		NgEliteEditorComponent,
		TextEditorComponent
	]
})
export class AlertModule { }
