import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
	parse: {
		dateInput: 'DD, MMM-YY',
	},
	display: {
		dateInput: 'DD, MMM-YY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'DD, MMM-YY',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

/** @title Datepicker with custom formats */
@Component({
	selector: 'app-date',
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.scss'],
	standalone: true,
	providers: [
		provideMomentDateAdapter(),
		{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
	],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		FormsModule,
		ReactiveFormsModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent {
	@Input() componentData: any;
	@Input() errorClass!: boolean;
	@Output() dateUpdate = new EventEmitter<any>();

	formBuilder = inject(FormBuilder);
	dynamicForm = this.formBuilder.group({});
	selectedDate = new FormControl(moment(''));

	ngOnInit (): void {
		this.createComponent(this.componentData);
	}

	addEvent (event: MatDatepickerInputEvent<Date>) {
		if (event.value) {
			const formattedDate = moment(event.value).format('YYYY-MM-DD'); // Convert to "YYYY-MM-DD"
			this.emitDate(formattedDate);
		} else {
			this.emitDate('');
		}
	}

	emitDate (pushDate: string) {
		this.dateUpdate.emit({
			controlName: this.componentData.name,
			data: pushDate,
		});
	}

	createComponent (controls: any): void {
		const validators = [];
		if (controls.validators?.dateFormat != undefined) {
			MY_FORMATS.display.dateInput = controls.validators.dateFormat;
		}

		if (controls.validators?.required) {
			validators.push(Validators.required);
		}

		this.dynamicForm.addControl(
			controls.name,
			this.formBuilder.control(moment(controls.value), validators)
		);

		if (controls.validators?.readonly) {
			this.dynamicForm.get(controls.name)?.disable();
		}

	}
}