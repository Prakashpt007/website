import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Basic menu
 */
@Component({
	selector: 'menu-overview-example',
	template: `

	<button mat-button [matMenuTriggerFor]="menu">Menu</button>
	<mat-menu #menu="matMenu">
		<button mat-menu-item>Item 1</button>
		<button mat-menu-item>Item 2</button>
	</mat-menu>


	`,
	standalone: true,
	imports: [MatButtonModule, MatMenuModule],
})
export class MenuOverviewExample { }
