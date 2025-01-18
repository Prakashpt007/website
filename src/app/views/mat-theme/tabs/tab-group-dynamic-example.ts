import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Tab group with dynamically changing tabs
 */
@Component({
	selector: 'tab-group-dynamic-example',
	template: `
	<h6>Tab group with dynamically changing tabs</h6>
	<mat-form-field>
	<mat-label>Selected tab index</mat-label>
	<input matInput type="number" [formControl]="selected">
	</mat-form-field>

	<div>
	<button mat-raised-button
			class="example-add-tab-button"
			(click)="addTab(selectAfterAdding.checked)">
		Add new tab
	</button>
	<mat-checkbox #selectAfterAdding> Select tab after adding </mat-checkbox>
	</div>

	<mat-tab-group [selectedIndex]="selected.value"
				(selectedIndexChange)="selected.setValue($event)">
	@for (tab of tabs; track tab; let index = $index) {
		<mat-tab [label]="tab">
		Contents for {{tab}} tab

		<button mat-raised-button
				class="example-delete-tab-button"
				[disabled]="tabs.length === 1"
				(click)="removeTab(index)">
			Delete Tab
		</button>
		</mat-tab>
	}
	</mat-tab-group>
	`,
	styles: `
	.example-input-label,
	.example-add-tab-button,
	.example-delete-tab-button {
	margin: 8px;
	}

	`,
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatTabsModule,
	],
})
export class TabGroupDynamicExample {
	tabs = ['First', 'Second', 'Third'];
	selected = new FormControl(0);

	addTab (selectAfterAdding: boolean) {
		this.tabs.push('New');

		if (selectAfterAdding) {
			this.selected.setValue(this.tabs.length - 1);
		}
	}

	removeTab (index: number) {
		this.tabs.splice(index, 1);
		this.selected.setValue(index);
	}
}
