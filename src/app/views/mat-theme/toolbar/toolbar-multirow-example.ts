import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

/**
 * @title Multi-row toolbar
 */
@Component({
	selector: 'toolbar-multirow-example',
	template: `
	<h6>Multi-row toolbar</h6>
	<mat-toolbar color="primary">
	<mat-toolbar-row>
		<span>Custom Toolbar</span>
	</mat-toolbar-row>

	<mat-toolbar-row>
		<span>Second Line</span>
		<span class="example-spacer"></span>
		<mat-icon class="example-icon" aria-hidden="false" aria-label="Example user verified icon">verified_user</mat-icon>
	</mat-toolbar-row>

	<mat-toolbar-row>
		<span>Third Line</span>
		<span class="example-spacer"></span>
		<mat-icon class="example-icon" aria-hidden="false" aria-label="Example heart icon">favorite</mat-icon>
		<mat-icon class="example-icon" aria-hidden="false" aria-label="Example delete icon">delete</mat-icon>
	</mat-toolbar-row>
	</mat-toolbar>

	`,
	styles: `
	.example-icon {
	padding: 0 14px;
	}
	.example-spacer {
	flex: 1 1 auto;
	}

	`,
	standalone: true,
	imports: [MatToolbarModule, MatIconModule],
})
export class ToolbarMultirowExample { }
