import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges} from "@angular/core";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_MOMENT_DATE_FORMATS, provideMomentDateAdapter} from "@angular/material-moment-adapter";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import moment from "moment";

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

@Component({
	selector: "app-date-range",
	templateUrl: "./date-range.component.html",
	styleUrls: ["./date-range.component.scss"],
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
	providers: [
		provideMomentDateAdapter(),
		{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
		{provide: MAT_MOMENT_DATE_FORMATS, useValue: MY_FORMATS},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent {
	@Input() componentData: any;
	@Input() errorClass: boolean = false;
	@Output() dateUpdate = new EventEmitter<any>();

	dynamicForm!: FormGroup;
	dateSubmit = false;

	constructor (public formBuilder: FormBuilder) { }

	ngOnInit (): void {
		// Default date format
		MY_FORMATS.display.dateInput = this.componentData.validators?.dateFormat || 'DD, MMM-YY';

		const value = this.componentData.value || '';  // Get the value from input
		const dates = value.split(' ');  // Split the date range string into two parts

		// Initialize the form group with null values
		this.dynamicForm = this.formBuilder.group({
			fromDate: [null, this.addRequired()],
			toDate: [null, this.addRequired()],
		});

		// Ensure the value is split correctly and set the form controls
		if (dates.length === 2) {
			const fromDate = moment(dates[0], 'YYYY-MM-DD');  // Parse fromDate
			const toDate = moment(dates[1], 'YYYY-MM-DD');    // Parse toDate

			// Check if both dates are valid
			if (fromDate.isValid() && toDate.isValid()) {
				// Set the form controls
				this.dynamicForm.get('fromDate')?.setValue(fromDate);
				this.dynamicForm.get('toDate')?.setValue(toDate);
			}
		}
	}

	addRequired (): Validators | null {
		return this.componentData.validators?.required ? Validators.required : null;
	}

	dateRangeChange (): void {
		this.dateSubmit = true;
		const {fromDate, toDate} = this.dynamicForm.value;

		if (fromDate && toDate) {
			if (moment(fromDate).isValid() && moment(toDate).isValid()) {
				const startDate = moment(fromDate).format('YYYY-MM-DD');
				const endDate = moment(toDate).format('YYYY-MM-DD');

				// Emit the formatted date range
				this.dateUpdate.emit({
					controlName: this.componentData.name,
					data: `${ startDate } ${ endDate }`,
				});
			}
		}
	}
}
