import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

/**
 * @title Basic toolbar
 */
@Component({
	selector: 'toolbar-basic-example',
	template: `
	<h6>Basic toolbar</h6>
	<mat-toolbar>
	<button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
		<mat-icon>menu</mat-icon>
	</button>
	<span>My App</span>
	<span class="example-spacer"></span>
	<button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
		<mat-icon>favorite</mat-icon>
	</button>
	<button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
		<mat-icon>share</mat-icon>
	</button>
	</mat-toolbar>

	`,
	styles: `
	.example-spacer {
	flex: 1 1 auto;
	}

	`,
	standalone: true,
	imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class ToolbarBasicExample { }
