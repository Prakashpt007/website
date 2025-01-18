import {Component} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';

export interface Section {
	name: string;
	updated: Date;
}

/**
 * @title List with sections
 */
@Component({
	selector: 'list-sections-example',
	styles: `
	.mat-mdc-list-item-icon {
	color: rgba(0, 0, 0, 0.54);
	}

	`,
	template: `
	<h6>List with sections</h6>
	<mat-list>
	<div mat-subheader>Folders</div>
	@for (folder of folders; track folder) {
		<mat-list-item>
		<mat-icon matListItemIcon>folder</mat-icon>
		<div matListItemTitle>{{folder.name}}</div>
		<div matListItemLine>{{folder.updated | date}}</div>
		</mat-list-item>
	}
	<mat-divider></mat-divider>
	<div mat-subheader>Notes</div>
	@for (note of notes; track note) {
		<mat-list-item>
		<mat-icon matListItemIcon>note</mat-icon>
		<div matListItemTitle>{{note.name}}</div>
		<div matListItemLine>{{note.updated | date}}</div>
		</mat-list-item>
	}
	</mat-list>

	`,
	standalone: true,
	imports: [MatListModule, MatIconModule, MatDividerModule, DatePipe],
})
export class ListSectionsExample {
	folders: Section[] = [
		{
			name: 'Photos',
			updated: new Date('1/1/16'),
		},
		{
			name: 'Recipes',
			updated: new Date('1/17/16'),
		},
		{
			name: 'Work',
			updated: new Date('1/28/16'),
		},
	];
	notes: Section[] = [
		{
			name: 'Vacation Itinerary',
			updated: new Date('2/20/16'),
		},
		{
			name: 'Kitchen Remodel',
			updated: new Date('1/18/16'),
		},
	];
}
