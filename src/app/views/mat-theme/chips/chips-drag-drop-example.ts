import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';

import {MatChipsModule} from '@angular/material/chips';

export interface Vegetable {
	name: string;
}

/**
 * @title Chips Drag and Drop
 */
@Component({
	selector: 'chips-drag-drop-example',
	template: `

<h6>Chips Drag and Drop</h6>
<mat-chip-set
  class="example-chip"
  cdkDropList
  cdkDropListOrientation="horizontal"
  (cdkDropListDropped)="drop($event)">
  @for (vegetable of vegetables; track vegetable) {
    <mat-chip
      class="example-box"
      cdkDrag
      >
      {{vegetable.name}}
    </mat-chip>
  }
</mat-chip-set>

`,
	styles: `

	.example-box.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.example-chip .cdk-drop-list-dragging {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

	`,
	standalone: true,
	imports: [MatChipsModule, CdkDropList, CdkDrag],
})
export class ChipsDragDropExample {
	vegetables: Vegetable[] = [
		{name: 'apple'},
		{name: 'banana'},
		{name: 'strawberry'},
		{name: 'orange'},
		{name: 'kiwi'},
		{name: 'cherry'},
	];

	drop (event: CdkDragDrop<Vegetable[]>) {
		moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
	}
}
