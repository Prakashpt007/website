import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface Fruit {
	name: string;
}

/**
 * @title Chips with input
 */
@Component({
	selector: 'chips-input-example',
	template: `
	<h6>Chips with input</h6>
	<mat-form-field class="example-chip-list">
	  <mat-label>Favorite Fruits</mat-label>
	  <mat-chip-grid #chipGrid aria-label="Enter fruits">
	    @for (fruit of fruits; track fruit) {
	      <mat-chip-row
	        (removed)="remove(fruit)"
	        [editable]="true"
	        (edited)="edit(fruit, $event)"
	        [aria-description]="'press enter to edit ' + fruit.name">
	        {{fruit.name}}
	        <button matChipRemove [attr.aria-label]="'remove ' + fruit.name">
	          <mat-icon>cancel</mat-icon>
	        </button>
	      </mat-chip-row>
	    }
	    <input placeholder="New fruit..."
	      [matChipInputFor]="chipGrid"
	      [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
	      [matChipInputAddOnBlur]="addOnBlur"
	      (matChipInputTokenEnd)="add($event)"/>
	    </mat-chip-grid>
	  </mat-form-field>
	
	
	`,
	styles: `

	.example-chip-list {
  width: 100%;
}

	`,
	standalone: true,
	imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
})
export class ChipsInputExample {
	addOnBlur = true;
	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

	announcer = inject(LiveAnnouncer);

	add (event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add our fruit
		if (value) {
			this.fruits.push({name: value});
		}

		// Clear the input value
		event.chipInput!.clear();
	}

	remove (fruit: Fruit): void {
		const index = this.fruits.indexOf(fruit);

		if (index >= 0) {
			this.fruits.splice(index, 1);

			this.announcer.announce(`Removed ${ fruit }`);
		}
	}

	edit (fruit: Fruit, event: MatChipEditedEvent) {
		const value = event.value.trim();

		// Remove fruit if it no longer has a name
		if (!value) {
			this.remove(fruit);
			return;
		}

		// Edit existing fruit
		const index = this.fruits.indexOf(fruit);
		if (index >= 0) {
			this.fruits[index].name = value;
		}
	}
}
