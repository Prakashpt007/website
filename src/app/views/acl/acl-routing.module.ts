import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user/list/user-list.component';
import {UserFormComponent} from './user/form/user-form.component';
import {ActivityListComponent} from './activity/list/activity-list.component';
import {ActivityFormComponent} from './activity/form/activity-form.component';
import {PermissionFormComponent} from './permission/form/permission-form.component';
import {PermissionListComponent} from './permission/list/permission-list.component';
import {MenuListComponent} from './menu/list/menu-list.component';
import {MenuFormComponent} from './menu/form/menu-form.component';
import {UserMenuListComponent} from './user-menu/list/user-menu-list.component';
import {UserMenuFormComponent} from './user-menu/form/user-menu-form.component';
import {SubmMenuListComponent} from './sub-menu/list/subm-menu-list.component';
import {SubMenuFormComponent} from './sub-menu/form/sub-menu-form.component';
import {MenuOrderComponent} from './menu-order/menu-order.component';
import {AccessGroupFormComponent} from './access-group/form/access-group-form.component';
import {AccessGroupListComponent} from './access-group/list/access-group-list.component';
import {AclGaurdService} from '../../services/route-access-services/acl.guard';

const routes: Routes = [
	{
		path: "",
		data: {
			title: "ACL",
			breadcrumb: {
				alias: "ACL",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "user/list",
				pathMatch: "full",
			},



			//--------Menu Order Routes--------//
			{
				path: "menu/order",
				canActivate: [AclGaurdService],
				component: MenuOrderComponent,
				data: {
					title: "Menu Order",
					breadcrumb: {
						label: "Menu Order",
						alias: "Menu Order",
					},
				},
			},
			//--------Menu Order Routes End--------//

			//--------User Access Group Routes--------//
			{
				path: "access-group/list",
				canActivate: [AclGaurdService],
				component: AccessGroupListComponent,
				data: {
					title: "Access Groups",
					breadcrumb: {
						label: "Access Groups",
						alias: "Access Groups",
					},
				},
			},
			{
				path: "access-group/form",
				canActivate: [AclGaurdService],
				component: AccessGroupFormComponent,
				data: {
					title: "Access Group Details",
					breadcrumb: {
						label: "Access Group Details",
						alias: "Access Group Details",
					},
				},
			},
			{
				path: "access-group/form/:id",
				canActivate: [AclGaurdService],
				component: AccessGroupFormComponent,
				data: {
					title: "Access Group Details",
					breadcrumb: {
						label: "Access Group Details",
						alias: "Access Group Details",
					},
				},
			},
			//--------User Access Group Routes End--------//

			//--------User Routes--------//
			{
				path: "user/list",
				canActivate: [AclGaurdService],
				component: UserListComponent,
				data: {
					title: "Users",
					breadcrumb: {
						label: "Users",
						alias: "Users",
					},
				},
			},
			{
				path: "user/form",
				canActivate: [AclGaurdService],
				component: UserFormComponent,
				data: {
					title: "User Details",
					breadcrumb: {
						label: "User Details",
						alias: "User Details",
					},
				},
			},
			{
				path: "user/form/:id",
				canActivate: [AclGaurdService],
				component: UserFormComponent,
				data: {
					title: "User Details",
					breadcrumb: {
						label: "User Details",
						alias: "User Details",
					},
				},
			},
			//--------User Routes End--------//

			//--------User Activity Routes--------//
			{
				path: "activity/list",
				canActivate: [AclGaurdService],
				component: ActivityListComponent,
				data: {
					title: "User Activities",
					breadcrumb: {
						label: "User Activities",
						alias: "User Activities",
					},
				},
			},
			{
				path: "activity/form",
				canActivate: [AclGaurdService],
				component: ActivityFormComponent,
				data: {
					title: "Activity Details",
					breadcrumb: {
						label: "Activity Details",
						alias: "Activity Details",
					},
				},
			},
			{
				path: "activity/form/:id",
				canActivate: [AclGaurdService],
				component: ActivityFormComponent,
				data: {
					title: "Activity Details",
					breadcrumb: {
						label: "Activity Details",
						alias: "Activity Details",
					},
				},
			},
			//--------Activity Activity End--------//

			//--------User Permission Routes--------//
			{
				path: "permission/list",
				canActivate: [AclGaurdService],
				component: PermissionListComponent,
				data: {
					title: "Permissions",
					breadcrumb: {
						label: "Permissions",
						alias: "Permissions",
					},
				},
			},
			{
				path: "permission/form",
				canActivate: [AclGaurdService],
				component: PermissionFormComponent,
				data: {
					title: "Permission Details",
					breadcrumb: {
						label: "Permission Details",
						alias: "Permission Details",
					},
				},
			},
			{
				path: "permission/form/:id",
				canActivate: [AclGaurdService],
				component: PermissionFormComponent,
				data: {
					title: "Permission Details",
					breadcrumb: {
						label: "Permission Details",
						alias: "Permission Details",
					},
				},
			},
			//--------User Permission End--------//

			//--------Menu Routes--------//
			{
				path: "menu/list",
				canActivate: [AclGaurdService],
				component: MenuListComponent,
				data: {
					title: "Menus",
					breadcrumb: {
						label: "Menus",
						alias: "Menus",
					},
				},
			},
			{
				path: "menu/form",
				canActivate: [AclGaurdService],
				component: MenuFormComponent,
				data: {
					title: "Menu Details",
					breadcrumb: {
						label: "Menu Details",
						alias: "Menu Details",
					},
				},
			},
			{
				path: "menu/form/:id",
				canActivate: [AclGaurdService],
				component: MenuFormComponent,
				data: {
					title: "Menu Details",
					breadcrumb: {
						label: "Menu Details",
						alias: "Menu Details",
					},
				},
			},
			//--------Menu End--------//

			//--------Sub-Menu Routes--------//
			{
				path: "submenu/list",
				canActivate: [AclGaurdService],
				component: SubmMenuListComponent,
				data: {
					title: "Sub-Menus",
					breadcrumb: {
						label: "Sub-Menus",
						alias: "Sub-Menus",
					},
				},
			},
			{
				path: "submenu/form",
				canActivate: [AclGaurdService],
				component: SubMenuFormComponent,
				data: {
					title: "Sub-Menu Details",
					breadcrumb: {
						label: "Sub-Menu Details",
						alias: "Sub-Menu Details",
					},
				},
			},
			{
				path: "submenu/form/:id",
				canActivate: [AclGaurdService],
				component: SubMenuFormComponent,
				data: {
					title: "Sub-Menu Details",
					breadcrumb: {
						label: "Sub-Menu Details",
						alias: "Sub-Menu Details",
					},
				},
			},
			//--------Sub-Menu End--------//

			//--------Activity Menu Routes--------//
			{
				path: "user-menu/list",
				canActivate: [AclGaurdService],
				component: UserMenuListComponent,
				data: {
					title: "Activity Menus",
					breadcrumb: {
						label: "Activity Menus",
						alias: "Activity Menus",
					},
				},
			},
			{
				path: "user-menu/form",
				canActivate: [AclGaurdService],
				component: UserMenuFormComponent,
				data: {
					title: "Activity Menu Details",
					breadcrumb: {
						label: "Activity Menu Details",
						alias: "Activity Menu Details",
					},
				},
			},
			{
				path: "user-menu/form/:id",
				canActivate: [AclGaurdService],
				component: UserMenuFormComponent,
				data: {
					title: "Activity Menu Details",
					breadcrumb: {
						label: "Activity Menu Details",
						alias: "Activity Menu Details",
					},
				},
			},
			//--------Activity Menu End--------//
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AclRoutingModule { }
