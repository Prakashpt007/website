import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * @title Tab group that keeps its content inside the DOM when it's off-screen.
 */
@Component({
	selector: 'tab-group-preserve-content-example',
	template: `

	<h6>Tab group that keeps its content inside the DOM when it's off-screen.
	Start the video in the first tab and navigate to the second one to see how it keeps playing.</h6>

	<p>Start the video in the first tab and navigate to the second one to see how it keeps playing.</p>

	<mat-tab-group preserveContent>
	<mat-tab label="First">
		<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/B-lipaiZII8"
		style="border: 0"
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen></iframe>
	</mat-tab>
	<mat-tab label="Second">Note how the video from the previous tab is still playing.</mat-tab>
	</mat-tab-group>

	`,
	standalone: true,
	imports: [MatTabsModule],
})
export class TabGroupPreserveContentExample { }
