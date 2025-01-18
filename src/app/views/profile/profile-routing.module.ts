import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {AuthGaurdService} from '../../services/auth-gaurd.service';

const routes: Routes = [
	{

		path: "",
		canActivate: [AuthGaurdService],
		component: ProfileComponent,
		data: {
			title: "Profile Details",
			breadcrumb: {
				label: "Profile Details",
				alias: "Profile Details",
			},
		},
		// children: [
		//     {
		//         path: "",
		//         redirectTo: "profile",
		//         pathMatch: "full",
		//     },
		//     {
		//         path: "profile",
		//         canActivate: [AuthGaurdService],
		//         component: ProfileComponent,
		//         data: {
		//             title: "Profile Details",
		//             breadcrumb: {
		//                 label: "Profile Details",
		//                 alias: "Profile Details",
		//             },
		//         },
		//     }
		// ]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule { }
