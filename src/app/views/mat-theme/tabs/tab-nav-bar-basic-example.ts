import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Basic use of the tab nav bar
 */
@Component({
	selector: 'tab-nav-bar-basic-example',
	template: `
	<h6>Basic use of the tab nav bar</h6>
	<nav mat-tab-nav-bar [backgroundColor]="background" [tabPanel]="tabPanel">
  @for (link of links; track link) {
    <a mat-tab-link
      (click)="activeLink = link"
      [active]="activeLink == link"> {{link}} </a>
  }
  <a mat-tab-link disabled>Disabled Link</a>
</nav>
<mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>

<button mat-raised-button class="example-action-button" (click)="toggleBackground()">
  Toggle background
</button>
<button mat-raised-button class="example-action-button" (click)="addLink()">
  Add link
</button>

	`,
	styles: `

	.example-action-button {
	margin-top: 8px;
	margin-right: 8px;
	}

	`,
	standalone: true,
	imports: [MatTabsModule, MatButtonModule],
})
export class TabNavBarBasicExample {
	links = ['First', 'Second', 'Third'];
	activeLink = this.links[0];
	background: ThemePalette = undefined;

	toggleBackground () {
		this.background = this.background ? undefined : 'primary';
	}

	addLink () {
		this.links.push(`Link ${ this.links.length + 1 }`);
	}
}
