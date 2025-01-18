import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Menu positioning
 */
@Component({
	selector: 'menu-position-example',
	template: `
	<h6>Menu positioning</h6>
	<button mat-button [matMenuTriggerFor]="aboveMenu">Above</button>
	<mat-menu #aboveMenu="matMenu" yPosition="above">
		<button mat-menu-item>Item 1</button>
		<button mat-menu-item>Item 2</button>
	</mat-menu>

	<button mat-button [matMenuTriggerFor]="belowMenu">Below</button>
	<mat-menu #belowMenu="matMenu" yPosition="below">
		<button mat-menu-item>Item 1</button>
		<button mat-menu-item>Item 2</button>
	</mat-menu>

	<button mat-button [matMenuTriggerFor]="beforeMenu">Before</button>
	<mat-menu #beforeMenu="matMenu" xPosition="before">
		<button mat-menu-item>Item 1</button>
		<button mat-menu-item>Item 2</button>
	</mat-menu>


	<button mat-button [matMenuTriggerFor]="afterMenu">After</button>
	<mat-menu #afterMenu="matMenu" xPosition="after">
		<button mat-menu-item>Item 1</button>
		<button mat-menu-item>Item 2</button>
	</mat-menu>


	`,
	standalone: true,
	imports: [MatButtonModule, MatMenuModule],
})
export class MenuPositionExample { }
