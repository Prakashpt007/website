import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {FormsModule} from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';

export interface Task {
	name: string;
	completed: boolean;
	color: ThemePalette;
	subtasks?: Task[];
}

/**
 * @title Basic checkboxes
 */
@Component({
	selector: 'checkbox-overview-example',
	template: `

<h6>Basic checkboxes</h6>
<section class="example-section">
  <mat-checkbox class="example-margin">Check me!</mat-checkbox>
  <mat-checkbox class="example-margin" [disabled]="true">Disabled</mat-checkbox>
</section>

<section class="example-section">
  <span class="example-list-section">
    <mat-checkbox class="example-margin"
      [checked]="allComplete"
      [color]="task.color"
      [indeterminate]="someComplete()"
      (change)="setAll($event.checked)">
      {{task.name}}
    </mat-checkbox>
  </span>
  <span class="example-list-section">
    <ul>
      @for (subtask of task.subtasks; track subtask) {
        <li>
          <mat-checkbox [(ngModel)]="subtask.completed"
            [color]="subtask.color"
            (ngModelChange)="updateAllComplete()">
            {{subtask.name}}
          </mat-checkbox>
        </li>
      }
    </ul>
  </span>
</section>


`,
	styles: `

	.example-section {
  margin: 12px 0;
}

.example-margin {
  margin: 0 12px;
}

ul {
  list-style-type: none;
  margin-top: 4px;
}


	`,
	standalone: true,
	imports: [MatCheckboxModule, FormsModule],
})
export class CheckboxOverviewExample {
	task: Task = {
		name: 'Indeterminate',
		completed: false,
		color: 'primary',
		subtasks: [
			{name: 'Primary', completed: false, color: 'primary'},
			{name: 'Accent', completed: false, color: 'accent'},
			{name: 'Warn', completed: false, color: 'warn'},
		],
	};

	allComplete: boolean = false;

	updateAllComplete () {
		this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
	}

	someComplete (): boolean {
		if (this.task.subtasks == null) {
			return false;
		}
		return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
	}

	setAll (completed: boolean) {
		this.allComplete = completed;
		if (this.task.subtasks == null) {
			return;
		}
		this.task.subtasks.forEach(t => (t.completed = completed));
	}
}
