import {CommonModule} from "@angular/common";
import {Component, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, SimpleChanges, inject} from "@angular/core";
import {FormsModule, ReactiveFormsModule, FormBuilder, AbstractControl, Validators} from "@angular/forms";
import {MatFormField, MatLabel, MatError, MatHint} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioButton, MatRadioModule} from "@angular/material/radio";
import {RouterModule} from "@angular/router";
import {Store} from "@ngrx/store";
import {AutosizeModule} from "ngx-autosize";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {ToastrService} from "ngx-toastr";
import {LocationService} from "../../services/location.service";
import {CheckboxGroupComponent} from "../form-controls/checkbox-group/checkbox-group.component";
import {CheckboxComponent} from "../form-controls/checkbox/checkbox.component";
import {DateRangeComponent} from "../form-controls/date-range/date-range.component";
import {DateComponent} from "../form-controls/date/date.component";
import {FileUploadComponent} from "../form-controls/file-upload/file-upload.component";
import {MobileCountryCodeTextfieldComponent} from "../form-controls/mobile-country-code-textfield/mobile-country-code-textfield.component";
import {MultipleFileUploadComponent} from "../form-controls/multiple-file-upload/multiple-file-upload.component";
import {MultiselectWithSearchComponent} from "../form-controls/multiselect-with-search/multiselect-with-search.component";
import {SelectWithSearchComponent} from "../form-controls/select-with-search/select-with-search.component";
import {TimeComponent} from "../form-controls/time/time.component";
import {FormFieldJSON} from "../formbuilder/form.field";
import {AppState, addToDropdownArray} from "../store/store.reducer";
import {GenericFunctionService} from "../../services/generic-function.service";
import {GenericHttpService} from "../../services/generic-http.service";


@Component({
	selector: 'app-raw-formbuilder',
	templateUrl: './raw-formbuilder.component.html',
	styleUrls: ['./raw-formbuilder.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SelectWithSearchComponent,
		CheckboxComponent,
		CheckboxGroupComponent,
		MultiselectWithSearchComponent,
		AutosizeModule,
		DateComponent,
		TimeComponent,
		DateRangeComponent,
		FileUploadComponent,
		MultipleFileUploadComponent,
		MobileCountryCodeTextfieldComponent,
		NgxMatTimepickerModule,
		RouterModule,
		MatFormField,
		MatLabel,
		MatError,
		MatHint,
		MatRadioButton,
		MatInputModule,
		MatRadioModule
	]
})
export class RawFormbuilderComponent {

	@Input() formActivity!: any;
	@Input() formErrorData!: any;
	@Input() componentData!: any;
	@Input() componentOptionDataFromParent!: any;
	@Input() backUrl!: any;
	@Input() existingWhList!: any;
	@Input() removeCols!: any;
	@Output() formBuilderSubmit = new EventEmitter<any>();
	@Output() otherFieldsSubmit = new EventEmitter<any>();

	formFields: FormFieldJSON[] = [];
	formBuilder = inject(FormBuilder);
	dynamicForm = this.formBuilder.group({});
	dynamicFormSubmitHandler = false;

	formOtherFields: any[] = [];
	isformOtherFieldsAvailabel: boolean = false;
	dynamicOtherFieldsForm = this.formBuilder.group({});
	dynamicOtherFieldsSubmitHandler = false;

	backUrlParams!: any;

	valueSubmitting: boolean = false;
	submitBtnStatus: boolean = false;
	formOtherFieldsSubmitting: boolean = false;

	cols: string = "";

	constructor (private store: Store<AppState>, private genFunctionService: GenericFunctionService, private genericHttp: GenericHttpService, private toastr: ToastrService, private locationService: LocationService, private el: ElementRef, private changeDetectorRef: ChangeDetectorRef) {

	}


	ngOnInit () {

		this.formFields = this.componentData.fields;
		this.addComponent(this.componentData.fields);

		if (this.removeCols || this.removeCols != null || this.removeCols != undefined) {
			this.cols = this.removeCols;  // Remove Cols and custom class to all
		} else if (this.componentData.fields.length < 3) {
			// Less than 3
			this.cols = "col-lg-6 col-xl-4 col-xxl-4";
		} else if (this.componentData.fields.length == 3) {
			// Equal to 3
			this.cols = "col-lg-6 col-xl-4 col-xxl-4";
		} else if (this.componentData.fields.length == 4) {
			// Equal to 4
			this.cols = "col-lg-6 col-xl-4 col-xxl-3";
		} else if (this.componentData.fields.length == 5) {
			// Equal to 5
			this.cols = "col-lg-6 col-xl-4 col-xxl-4";
		} else if (this.componentData.fields.length == 6) {
			// Equal to 6
			this.cols = "col-lg-6 col-xl-4 col-xxl-4";
		} else if (this.componentData.fields.length > 6) {
			// Greater tham 6
			this.cols = "col-lg-6 col-xl-4 col-xxl-4";
		} else {
			this.cols = "col-lg-6 col-xl-4 col-xxl-auto";
		}

		if (this.existingWhList != undefined) {
			if (this.existingWhList.length > 0) {
				this.formOtherFields = this.existingWhList;
				this.addOtherComponent(this.existingWhList);
				this.isformOtherFieldsAvailabel = true;
			} else {
				this.isformOtherFieldsAvailabel = false;
			}
		}


		this.componentData.fields.map((item: any) => item.name != null ? item.name : null).forEach((item: any) => {
			item ? this.store.dispatch(addToDropdownArray(item)) : null;
		});


		// Get backurl params from store and set value to backurl with params
		this.store.select('store').subscribe({
			next: (response) => {
				this.backUrlParams = response.backUrl;
			}
		});

		this.dynamicForm.valueChanges.subscribe((data: any) => {
			if (data) {
				this.submitBtnStatus = true;
			}
		});

	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes["formErrorData"]) {
			let data = changes["formErrorData"].currentValue;
			if (data.length > 0) {
				data.forEach((error: {name: any; errorMessage: any;}) => {
					const {name, errorMessage} = error;
					const control = this.dynamicForm.get(name);
					if (control) {
						control.setErrors({backendError: errorMessage});
					}
				});
				this.valueSubmitting = false;
			}
		}
	}

	get f (): {[key: string]: AbstractControl;} {
		return this.dynamicForm.controls;
		// return this.dynamicForm.controls;
	}

	get dy (): {[key: string]: AbstractControl;} {
		return this.dynamicOtherFieldsForm.controls;
	}

	addOtherComponent (controls: any[]): void {
		for (let control of controls) {
			const validators = [];
			if (control.validators?.required) {
				validators.push(Validators.required);
			}
			if (control.validators?.email) {
				validators.push(Validators.email);
			}

			if (control.validators?.maxLength) {
				validators.push(Validators.maxLength(control.validators?.maxLength));
			}

			if (control.validators?.minLength) {
				validators.push(Validators.minLength(control.validators?.minLength));
			}
			this.dynamicOtherFieldsForm.addControl(
				control.name,
				this.formBuilder.control(control.value != null ? control.value : '', validators)
			);
		}

	}

	addComponent (controls: FormFieldJSON[]): void {
		// console.log(controls[1].type == 'mobileNo');

		for (let control of controls) {
			const validators = [];
			if (control.validators?.required) {
				validators.push(Validators.required);
			}

			if (control.validators?.email) {
				validators.push(Validators.email);
			}

			if (control.type == 'url') {

				validators.push(Validators.pattern(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\/?\??.*)$/));
			}

			if (control.validators?.mobile) {
				validators.push(Validators.pattern(/^[0-9]\d*$/));
			}

			if (control.type == 'numeric') {
				validators.push(Validators.pattern(/^[0-9]\d*$/));
			}

			if (control.type == 'customNumeric') {
				validators.push(Validators.pattern(/^[0-9]\d*$/));
			}

			if (control.type == 'customPatternText') {
				if (control.validators?.pattern != undefined) {
					Validators.pattern(this.genFunctionService.stringToRegex(control.validators?.pattern));
				} else {
					validators.push(Validators.pattern(/^(?!.*  )[0-9,+\- ]+$/));
				}
			}

			if (control.validators?.min) {
				validators.push(Validators.maxLength(control.validators?.min));
			}

			if (control.validators?.max) {
				validators.push(Validators.maxLength(control.validators?.max));
			}

			if (control.validators?.maxLength) {
				validators.push(Validators.maxLength(control.validators?.maxLength));
			}

			if (control.validators?.minLength) {
				validators.push(Validators.minLength(control.validators?.minLength));
			}
			this.dynamicForm.addControl(
				control.name,
				this.formBuilder.control(control.value != null ? control.value : '', validators)
			);

			// Disable/ Readonly field

			if (control.type != 'select' && control.type != 'multiselect') {
				if (control.validators?.disabled) {
					this.dynamicForm.get(control.name)?.disable();
				} else {
					this.dynamicForm.get(control.name)?.enable();
				}
			}
		}
	}

	saveForm () {
		// this.dynamicFormSubmitHandler = true;
		// if (this.dynamicForm.invalid) {
		// 	console.warn("Error=> ", this.dynamicForm.value);
		// 	return;
		// } else {
		// 	// console.log(this.dynamicForm.value);

		// 	this.valueSubmitting = true;
		// 	// this.formBuilderSubmit.emit(this.dynamicForm.value);
		// 	this.formBuilderSubmit.emit({
		// 		form: "single",
		// 		storeUrl: this.componentData.formStoreUrl,
		// 		data: this.dynamicForm.value,
		// 	});
		// 	setTimeout(() => {
		// 		this.submitBtnStatus = false;
		// 		this.valueSubmitting = false;
		// 	}, 1000);
		// }


		this.dynamicFormSubmitHandler = true;
		if (this.dynamicForm.invalid) {
			console.warn("Error=> ", this.dynamicForm.value);
			return;
		} else {
			// console.log(this.dynamicForm.value);

			this.valueSubmitting = true;
			// this.formBuilderSubmit.emit(this.dynamicForm.value);
			this.formBuilderSubmit.emit({
				form: "single",
				storeUrl: this.componentData.formStoreUrl,
				data: this.dynamicForm.value,
			});
		}
	}

	saveOtherForm () {
		this.dynamicOtherFieldsSubmitHandler = true;
		if (this.dynamicOtherFieldsForm.invalid) {
			console.warn("Error=> ", this.dynamicOtherFieldsForm.value);
			return;
		} else {
			console.log(this.dynamicOtherFieldsForm.value);
			this.formOtherFieldsSubmitting = true;
			this.otherFieldsSubmit.emit({
				form: "other",
				storeUrl: this.existingWhList[0].storeUrl,
				data: this.dynamicOtherFieldsForm.value,
			});
		}
	}

	onSelectionChange (selectedValues: any) {

		if (this.dynamicForm.get(selectedValues.controlName)?.value == selectedValues.data) {
		} else {
			this.dynamicForm.markAsDirty();
		}

		// this.dynamicForm.get(selectedValues.controlName);

		this.dynamicForm.patchValue({
			[selectedValues.controlName]: selectedValues.data,
		});

	}

	onCheckboxUpdate (selectedValues: any) {
		if (this.dynamicForm.get(selectedValues.controlName)?.value == selectedValues.data) {
			this.dynamicForm.get(selectedValues.controlName)?.markAsDirty();
		}
		this.dynamicForm.patchValue({
			[selectedValues.controlName]: selectedValues.data,
		});
	}

	onDateUpdate (selectedDate: any) {
		// if (this.dynamicForm.get(selectedDate.controlName)?.value == selectedDate.data) {
		// } else {
		// 	this.dynamicForm.get(selectedDate.controlName)?.markAsDirty();

		// }

		const firstDate = new Date(this.dynamicForm.get(selectedDate.controlName)?.value);
		const secondDate = new Date(selectedDate.data);

		if (firstDate == secondDate) {
			console.log("Same Date");

		} else {
			this.dynamicForm.get(selectedDate.controlName)?.markAsDirty();
		}

		this.dynamicForm.patchValue({
			[selectedDate.controlName]: selectedDate.data,
		});
	}

	onTimeUpdate (selectedTime: any) {
		console.log(selectedTime);

		this.dynamicForm.patchValue({
			[selectedTime.controlName]: selectedTime.data,
		});
	}

	onFileUpdate (selectedFile: any) {
		console.log(selectedFile.data);

		this.dynamicForm.get(selectedFile.controlName)?.markAsDirty();

		this.dynamicForm.patchValue({
			[selectedFile.controlName]: selectedFile.data,
		});
	}


	getChildDlOptionsByParentId (event: any) {
		this.componentOptionDataFromParent = event;
		this.changeDetectorRef.detectChanges();
		// console.log(event);

		const data = event.data;

		this.formFields.map((item: any) => {
			if (item.name == event.controlName) {
				data.forEach((itemVal: any) => {
					if (itemVal.value == item.value) {

					} else {
						item.value = '';
					}
				});
			}
		});
		// console.log(this.formFields);
	}
}
