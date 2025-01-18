import {CommonModule} from "@angular/common";
import {Component, Input, Output, EventEmitter, inject} from "@angular/core";
import {FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {TimeFormatPipe} from "../../pipes/time-format.pipe";

@Component({
	selector: 'app-time',
	templateUrl: './time.component.html',
	styleUrls: ['./time.component.scss'],
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		NgxMatTimepickerModule,
		MatIconModule,
		MatTimepickerModule,
		MatIcon,
		TimeFormatPipe
	]
})
export class TimeComponent {
	@Input() componentData: any;
	@Input() errorClass!: boolean;
	@Output() timeUpdate = new EventEmitter<any>();
	formBuilder = inject(FormBuilder);
	constructor () { }

	dynamicForm = this.formBuilder.group({});

	formControl!: FormControl<Date | null>;

	timeChangeHandler (event: any) {
		this.timeUpdate.emit({
			controlName: this.componentData.name,
			data: event,
		});
	}

	ngOnInit (): void {
		// console.log(this.componentData);

		this.createComponent(this.componentData);
	}


	createComponent (controls: any): void {
		const validators = [];
		let time = controls.value.split(':');
		const initialValue = new Date();

		if (controls.validators?.required) {
			validators.push(Validators.required);
		}

		if (controls.value.length > 5) {
			initialValue.setHours(time[0], time[1], time[2]);
			this.dynamicForm.addControl(
				controls.name,
				this.formBuilder.control(initialValue, validators)
			);
		} else {
			console.log('edit');

			initialValue.setHours(time[0], time[1], time[2]);
			this.dynamicForm.addControl(
				controls.name,
				this.formBuilder.control(initialValue, validators)
			);
		}

		// Disable/ Readonly field
		if (controls.validators?.readonly) {
			this.dynamicForm.get(controls.name)?.disable();
		} else {
			this.dynamicForm.get(controls.name)?.enable();
		}
		// End
	}
}
