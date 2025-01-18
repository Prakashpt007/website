import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

/**
 * @title Badge overview
 */
@Component({
	selector: 'badge-overview-example',
	template: `
	  <div matBadge="4" matBadgeOverlap="false" class="demo-section">Text with a badge</div>

  <div matBadge="1" matBadgeSize="large" class="demo-section">Text with large badge</div>

<div class="demo-section">
  Button with a badge on the left
  <button mat-raised-button color="primary"
      matBadge="8" matBadgePosition="before" matBadgeColor="accent">
    Action
  </button>
</div>

<div class="demo-section">
    Button toggles badge visibility
    <button mat-raised-button matBadge="7" [matBadgeHidden]="hidden" (click)="toggleBadgeVisibility()">
        Hide
    </button>
  </div>

<div class="demo-section">
  Icon with a badge
  <mat-icon matBadge="15" matBadgeColor="warn">home</mat-icon>
    <!-- Include text description of the icon's meaning for screen-readers -->
    <span class="cdk-visually-hidden">
      Example with a home icon with overlaid badge showing the number 15
    </span>
</div>


	`,
	styles: `
	:host {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.demo-section + .demo-section {
  margin-top: 16px;
}
	`,
	standalone: true,
	imports: [MatBadgeModule, MatButtonModule, MatIconModule],
})
export class BadgeOverviewExample {
	hidden = false;

	toggleBadgeVisibility () {
		this.hidden = !this.hidden;
	}
}
