import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {P404Component} from './container/error/404.component';
import {P500Component} from './container/error/500.component';
import {MainContainerComponent} from './container/default-layout/main-container.component';
import {TestComponent} from './views/test/test.component';
import {MatThemeComponent} from './views/mat-theme/mat-theme.component';
import {ExperimentsComponent} from './views/experiments/experiments.component';


const routes: Routes = [
	{
		path: "",
		redirectTo: "dashboard",
		pathMatch: "full",
	},

	{
		path: "login",
		component: LoginComponent,
		data: {
			title: "Login Page",
		},
	},

	{
		path: "404",
		component: P404Component,
		data: {
			title: "Page 404",
		},
	},

	{
		path: "500",
		component: P500Component,
		data: {
			title: "Page 500",
		},
	},

	{
		path: "",
		component: MainContainerComponent,
		children: [

			{
				path: "test",
				component: TestComponent
			},

			{
				path: "mat-theme",
				component: MatThemeComponent
			},
			{
				path: "experiments",
				component: ExperimentsComponent
			},

			{
				path: "",
				// canActivate: [AuthGaurdService],
				loadChildren: () => import("./views/dashboard/dashboard.module").then((m) => m.DashboardModule)
			},

			{
				path: "profile",
				loadChildren: () => import("./views/profile/profile.module").then((m) => m.ProfileModule)
			},

			{
				path: "admin",
				loadChildren: () => import("./views/admin/admin.module").then((m) => m.AdminModule)
			},
			{
				path: "hr-department",
				loadChildren: () => import("./views/hr-department/hr-department.module").then((m) => m.HrDepartmentModule)
			},

			{
				path: "config",
				loadChildren: () => import("./views/config/config.module").then((m) => m.ConfigModule)
			},

			{
				path: "warehouse",
				loadChildren: () => import("./views/warehouse/warehouse.module").then((m) => m.WarehouseModule)
			},

			{
				path: "agri",
				loadChildren: () => import("./views/agri/agri.module").then((m) => m.AgriModule)
			},

			{
				path: "geo",
				loadChildren: () => import("./views/geo/geo.module").then((m) => m.GeoModule)
			},

			{
				path: "gen",
				loadChildren: () => import("./views/gen/gen.module").then((m) => m.GenModule)
			},

			{
				path: "regional",
				loadChildren: () => import("./views/regional/regional.module").then((m) => m.RegionalModule)
			},

			{
				path: "acl",
				loadChildren: () => import("./views/acl/acl.module").then((m) => m.AclModule)
			},

			{
				path: "alert",
				loadChildren: () => import("./views/alert/alert.module").then((m) => m.AlertModule)
			},

			{
				path: "operations",
				loadChildren: () => import("./views/operation/operation.module").then((m) => m.OperationModule)
			},

			{
				path: "gamification",
				loadChildren: () => import("./views/gamification/gamification.module").then((m) => m.GamificationModule)
			},

			{
				path: "basic-kyc",
				loadChildren: () => import("./views/basic-kyc/basic-kyc.module").then((m) => m.BasicKycModule)
			},

			{
				path: "finance-qa",
				loadChildren: () => import("./views/finance-qa/finance-qa.module").then((m) => m.FinanceQaModule)
			},

			{
				path: "warehouse-qa",
				loadChildren: () => import("./views/warehouse-qa/warehouse-qa.module").then((m) => m.WarehouseQaModule)
			},

			{
				path: "geo-qa",
				loadChildren: () => import("./views/geo-qa/geo-qa.module").then((m) => m.GeoQaModule)
			},

			{
				path: "company-qa",
				loadChildren: () => import("./views/company-qa/company-qa.module").then((m) => m.CompanyQaModule)
			},

			{
				path: "scheduling-qa",
				loadChildren: () => import("./views/scheduling-qa/scheduling-qa.module").then((m) => m.SchedulingQaModule)
			},
			{
				path: "telecaller-qa",
				loadChildren: () => import("./views/telecaller-qa/telecaller-qa.module").then((m) => m.TelecallerQaModule)
			},

			{
				path: "incomplete",
				loadChildren: () => import("./views/incomplete/incomplete.module").then((m) => m.IncompleteModule)
			},

			{
				path: "intervention",
				loadChildren: () => import("./views/intervention/intervention.module").then((m) => m.InterventionModule)
			},
			{
				path: "eway",
				loadChildren: () => import("./views/eway/eway.module").then((m) => m.EWayModule)
			},

		],
	},

	{
		path: "**",
		component: P404Component,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
