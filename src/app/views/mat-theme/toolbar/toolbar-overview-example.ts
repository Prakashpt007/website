import {Component} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";


/**
 * @title Toolbar overview
 */
@Component({
	selector: 'toolbar-overview-example',
	template: `
	<h6>Toolbar overview</h6>
	<p>
	<mat-toolbar>
		<span>My Application</span>
	</mat-toolbar>
	</p>

	<p>
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
	</p>

	<p>
	<mat-toolbar color="primary">
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
	</p>

	<p>
	<mat-toolbar color="primary">
		<mat-toolbar-row>
		<span>My App</span>
		<span class="example-spacer"></span>
		<button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
			<mat-icon>menu</mat-icon>
		</button>
		</mat-toolbar-row>

		<mat-toolbar-row>
		<span>Second Line</span>
		<span class="example-spacer"></span>
		<button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
			<mat-icon>favorite</mat-icon>
		</button>
		<button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
			<mat-icon>share</mat-icon>
		</button>
		</mat-toolbar-row>
	</mat-toolbar>
	</p>

	`,
	styles: `

	.example-spacer {
	flex: 1 1 auto;
	}

	`,
	standalone: true,
	imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class ToolbarOverviewExample { }
