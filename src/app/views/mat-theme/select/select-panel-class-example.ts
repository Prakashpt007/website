import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Select with custom panel styling
 */
@Component({
	selector: 'select-panel-class-example',
	template: `
	<h6>Select with custom panel styling</h6>
	<mat-form-field>
		<mat-label>Panel color</mat-label>
		<mat-select [formControl]="panelColor"
					panelClass="example-panel-{{panelColor.value}}">
			<mat-option value="red">Red</mat-option>
			<mat-option value="green">Green</mat-option>
			<mat-option value="blue">Blue</mat-option>
		</mat-select>
	</mat-form-field>


	`,
	styles: `

	.example-panel-red.mat-mdc-select-panel {
	background: rgba(255, 0, 0, 0.5);
	}

	.example-panel-green.mat-mdc-select-panel {
	background: rgba(0, 255, 0, 0.5);
	}

	.example-panel-blue.mat-mdc-select-panel {
	background: rgba(0, 0, 255, 0.5);
	}

	`,
	// Encapsulation has to be disabled in order for the
	// component style to apply to the select panel.
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class SelectPanelClassExample {
	panelColor = new FormControl('red');
}
