import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Menu with icons
 */
@Component({
	selector: 'menu-icons-example',
	template: `
	<h6>Menu with icons</h6>
	<button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
	<mat-icon>more_vert</mat-icon>
	</button>
	<mat-menu #menu="matMenu">
	<button mat-menu-item>
		<mat-icon>dialpad</mat-icon>
		<span>Redial</span>
	</button>
	<button mat-menu-item disabled>
		<mat-icon>voicemail</mat-icon>
		<span>Check voice mail</span>
	</button>
	<button mat-menu-item>
		<mat-icon>notifications_off</mat-icon>
		<span>Disable alerts</span>
	</button>
	</mat-menu>


	`,
	standalone: true,
	imports: [MatButtonModule, MatMenuModule, MatIconModule],
})
export class MenuIconsExample { }
