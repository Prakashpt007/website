import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AclRoutingModule} from './acl-routing.module';
import {UserFormComponent} from './user/form/user-form.component';
import {UserListComponent} from './user/list/user-list.component';
import {ActivityFormComponent} from './activity/form/activity-form.component';
import {ActivityListComponent} from './activity/list/activity-list.component';
import {PermissionFormComponent} from './permission/form/permission-form.component';
import {PermissionListComponent} from './permission/list/permission-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuFormComponent} from './menu/form/menu-form.component';
import {MenuListComponent} from './menu/list/menu-list.component';
import {UserMenuFormComponent} from './user-menu/form/user-menu-form.component';
import {UserMenuListComponent} from './user-menu/list/user-menu-list.component';
import {SubMenuFormComponent} from './sub-menu/form/sub-menu-form.component';
import {SubmMenuListComponent} from './sub-menu/list/subm-menu-list.component';
import {MenuOrderComponent} from './menu-order/menu-order.component';
import {AccessGroupFormComponent} from './access-group/form/access-group-form.component';
import {AccessGroupListComponent} from './access-group/list/access-group-list.component';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';
import {FormbuilderComponent} from '../../utility/formbuilder/formbuilder.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';

@NgModule({
	declarations: [
		UserFormComponent,
		UserListComponent,
		ActivityFormComponent,
		ActivityListComponent,
		PermissionFormComponent,
		PermissionListComponent,
		MenuFormComponent,
		MenuListComponent,
		UserMenuFormComponent,
		UserMenuListComponent,
		SubMenuFormComponent,
		SubmMenuListComponent,
		MenuOrderComponent,
		AccessGroupFormComponent,
		AccessGroupListComponent
	],
	imports: [
		CommonModule,
		AclRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
	]
})
export class AclModule { }
