import {Component} from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Configurable checkbox
 */
@Component({
	selector: 'checkbox-configurable-example',
	template: `

	<h6>Configurable checkbox</h6>
	<mat-card>
  <mat-card-content>
    <h6 class="example-h2">Checkbox configuration</h6>

    <section class="example-section">
      <mat-checkbox class="example-margin" [(ngModel)]="checked">Checked</mat-checkbox>
      <mat-checkbox class="example-margin" [(ngModel)]="indeterminate">Indeterminate</mat-checkbox>
    </section>

    <section class="example-section">
      <label class="example-margin">Align:</label>
      <mat-radio-group [(ngModel)]="labelPosition">
        <mat-radio-button class="example-margin" value="after">After</mat-radio-button>
        <mat-radio-button class="example-margin" value="before">Before</mat-radio-button>
      </mat-radio-group>
    </section>

    <section class="example-section">
      <mat-checkbox class="example-margin" [(ngModel)]="disabled">Disabled</mat-checkbox>
    </section>
  </mat-card-content>
</mat-card>

<mat-card class="result mt-4">
  <mat-card-content>
    <h6 class="example-h2">Result</h6>

    <section class="example-section">
      <mat-checkbox
          class="example-margin"
          [(ngModel)]="checked"
          [(indeterminate)]="indeterminate"
          [labelPosition]="labelPosition"
          [disabled]="disabled">
        I'm a checkbox
      </mat-checkbox>
    </section>
  </mat-card-content>
</mat-card>
	`,
	styles: `
	.example-h2 {
  margin: 10px;
}

.example-section {
  display: flex;
  align-content: center;
  align-items: center;
  height: 60px;
}

.example-margin {
  margin: 0 10px;
}

	`,
	standalone: true,
	imports: [MatCardModule, MatCheckboxModule, FormsModule, MatRadioModule],
})
export class CheckboxConfigurableExample {
	checked = false;
	indeterminate = false;
	labelPosition: 'before' | 'after' = 'after';
	disabled = false;
}
