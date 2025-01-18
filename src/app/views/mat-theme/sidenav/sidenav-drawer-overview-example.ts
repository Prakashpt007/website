import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';

/** @title Basic drawer */
@Component({
	selector: 'sidenav-drawer-overview-example',
	template: `
	<mat-drawer-container class="example-container">
		<mat-drawer mode="side" opened>Drawer content</mat-drawer>
		<mat-drawer-content>Main content</mat-drawer-content>
	</mat-drawer-container>


	`,
	styles: `
	.example-container {
		width: auto;
		height: 200px;
		margin: 10px;
		border: 1px solid #555;
		/* The background property is added to clearly distinguish the borders between drawer and main
			content */
		// background: #eee;
	}

	`,
	standalone: true,
	imports: [MatSidenavModule],
})
export class SidenavDrawerOverviewExample { }
