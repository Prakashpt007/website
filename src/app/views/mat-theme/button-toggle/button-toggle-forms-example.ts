import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

/**
 * @title Button-toggles with forms
 */
@Component({
	selector: 'button-toggle-forms-example',
	template: `
<h6>Button-toggles with forms</h6>
<section>
  <h6>Button Toggle inside of a Template-driven form</h6>
  <mat-button-toggle-group [(ngModel)]="fontStyle" aria-label="Font Style">
    <mat-button-toggle value="bold">Bold</mat-button-toggle>
    <mat-button-toggle value="italic">Italic</mat-button-toggle>
    <mat-button-toggle value="underline">Underline</mat-button-toggle>
  </mat-button-toggle-group>
  <p>Chosen value is {{fontStyle}}</p>
</section>

<section>
	<br/>
  <h6>Button Toggle inside of a Reactive form</h6>
  <mat-button-toggle-group [formControl]="fontStyleControl" aria-label="Font Style">
    <mat-button-toggle value="bold">Bold</mat-button-toggle>
    <mat-button-toggle value="italic">Italic</mat-button-toggle>
    <mat-button-toggle value="underline">Underline</mat-button-toggle>
  </mat-button-toggle-group>
  <p>Chosen value is {{fontStyleControl.value}}</p>
</section>



	`,
	standalone: true,
	imports: [MatButtonToggleModule, FormsModule, ReactiveFormsModule],
})
export class ButtonToggleFormsExample {
	fontStyleControl = new FormControl('');
	fontStyle?: string;
}
