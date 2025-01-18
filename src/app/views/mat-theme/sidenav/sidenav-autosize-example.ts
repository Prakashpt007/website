import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

/**
 * @title Autosize sidenav
 */
@Component({
	selector: 'sidenav-autosize-example',
	template: `
	<h6>Autosize sidenav</h6>
	<mat-drawer-container class="example-container" autosize>
	<mat-drawer #drawer class="example-sidenav" mode="side">
		<p>Auto-resizing sidenav</p>
		@if (showFiller) {
		<p>Lorem, ipsum dolor sit amet consectetur.</p>
		}
		<button (click)="showFiller = !showFiller" mat-raised-button>
		Toggle extra text
		</button>
	</mat-drawer>

	<div class="example-sidenav-content">
		<button type="button" color="accent" mat-raised-button (click)="drawer.toggle()">
		Toggle sidenav
		</button>
	</div>

	</mat-drawer-container>

	`,
	styles: `

	.example-container {
	width: 500px;
	height: 300px;
	border: 1px solid rgba(0, 0, 0, 0.5);
	}

	.example-sidenav-content {
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: center;
	}

	.example-sidenav {
	padding: 20px;
	}


	`,
	standalone: true,
	imports: [MatSidenavModule, MatButtonModule],
})
export class SidenavAutosizeExample {
	showFiller = false;
}
