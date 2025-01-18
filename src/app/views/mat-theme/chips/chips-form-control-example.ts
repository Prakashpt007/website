import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {LiveAnnouncer} from '@angular/cdk/a11y';

/**
 * @title Chips with form control
 */
@Component({
	selector: 'chips-form-control-example',
	template: `
	<h6>Chips with form control</h6>
	<div class="example-button-container">
	  <button mat-raised-button (click)="formControl.disable()">Disable form control</button>
	  <button mat-raised-button (click)="formControl.enable()">Enable form control</button>
	</div>
	<p>
	  <em>Enter video keywords</em>
	</p>
	<mat-form-field class="example-form-field">
	  <mat-label>Video keywords</mat-label>
	  <mat-chip-grid #chipGrid aria-label="Enter keywords" [formControl]="formControl" >
	    @for (keyword of keywords; track keyword) {
	      <mat-chip-row (removed)="removeKeyword(keyword)">
	        {{keyword}}
	        <button matChipRemove aria-label="'remove ' + keyword">
	          <mat-icon>cancel</mat-icon>
	        </button>
	      </mat-chip-row>
	    }
	  </mat-chip-grid>
	  <input placeholder="New keyword..."
	    [matChipInputFor]="chipGrid"
	    (matChipInputTokenEnd)="add($event)"/>
	  </mat-form-field>
	
	  <p>
	    <strong>The following keywords are entered:</strong> {{formControl.value}}
	  </p>
	
	
	`,
	styles: `

	.example-form-field {
  width: 100%;
}

.example-button-container > button {
  margin: 0 12px;
}


	`,
	standalone: true,
	imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
],
})
export class ChipsFormControlExample {
	keywords = ['angular', 'how-to', 'tutorial', 'accessibility'];
	formControl = new FormControl(['angular']);

	announcer = inject(LiveAnnouncer);

	removeKeyword (keyword: string) {
		const index = this.keywords.indexOf(keyword);
		if (index >= 0) {
			this.keywords.splice(index, 1);

			this.announcer.announce(`removed ${ keyword }`);
		}
	}

	add (event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add our keyword
		if (value) {
			this.keywords.push(value);
		}

		// Clear the input value
		event.chipInput!.clear();
	}
}
