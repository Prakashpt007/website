import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';

/**
 * @title List variants
 */
@Component({
	selector: 'list-variants-example',
	template: `
	<h6>List variants</h6>
	<h6>Single line lists</h6>

	<mat-list>
		<mat-list-item>
			<span matListItemTitle>This is the title</span>
		</mat-list-item>
		<mat-list-item>Also the title</mat-list-item>
	</mat-list>

	<h6>Two line lists</h6>
	<mat-list>
		<mat-list-item>
			<span matListItemTitle>Title</span>
			<span matListItemLine>Second line</span>
		</mat-list-item>
		<mat-list-item>
			<span matListItemTitle>Title</span>
			<span>Second line</span>
		</mat-list-item>
		<mat-list-item>
			<span matListItemTitle>Title</span>
			Second line
		</mat-list-item>
	</mat-list>

	<h6>Three line lists</h6>
	<mat-list>
		<mat-list-item>
			<span matListItemTitle>Title</span>
			<span matListItemLine>Second line</span>
			<span matListItemLine>Third line</span>
		</mat-list-item>
		<mat-list-item>
			<span matListItemTitle>Title</span>
			<span matListItemLine>Second line. This line will truncate.</span>
			<span>Third line</span>
		</mat-list-item>
		<mat-list-item>
			<span matListItemTitle>Title</span>
			<span matListItemLine>Second line. This line will truncate.</span>
			Third line
		</mat-list-item>
	</mat-list>

	<h6>Three line list with secondary text wrapping</h6>
	<mat-list class="example-list-wrapping">
		<mat-list-item lines="3">
			<span matListItemTitle>Title</span>
    		<span>Secondary line that will wrap because the list lines is explicitly set to 3 lines. Text inside of a 'matListItemTitle' or 'matListItemLine' will never wrap.</span>
		</mat-list-item>
	</mat-list>

	`,
	styles: `

	.example-list-wrapping {
  max-width: 500px;
}

	`,
	standalone: true,
	imports: [MatListModule],
})
export class ListVariantsExample { }
