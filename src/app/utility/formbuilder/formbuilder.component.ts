import {CommonModule} from "@angular/common";
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, signal, SimpleChanges} from "@angular/core";
import {FormsModule, ReactiveFormsModule, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AppState, addToDropdownArray} from "../store/store.reducer";
import {TimeComponent} from "../form-controls/time/time.component";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {LocationService} from "../../services/location.service";
import {SelectWithSearchComponent} from "../form-controls/select-with-search/select-with-search.component";
import {CheckboxComponent} from "../form-controls/checkbox/checkbox.component";
import {CheckboxGroupComponent} from "../form-controls/checkbox-group/checkbox-group.component";
import {MultiselectWithSearchComponent} from "../form-controls/multiselect-with-search/multiselect-with-search.component";
import {AutosizeModule} from "ngx-autosize";
import {DateComponent} from "../form-controls/date/date.component";
import {DateRangeComponent} from "../form-controls/date-range/date-range.component";
import {FileUploadComponent} from "../form-controls/file-upload/file-upload.component";
import {RouterModule} from "@angular/router";
import {Store} from "@ngrx/store";
import {ToastrService} from "ngx-toastr";
import {MobileCountryCodeTextfieldComponent} from "../form-controls/mobile-country-code-textfield/mobile-country-code-textfield.component";
import {MobileCountryCodeComponent} from "../form-controls/mobile-country-code/mobile-country-code.component";
import {MultipleFileUploadComponent} from "../form-controls/multiple-file-upload/multiple-file-upload.component";
import {FormFieldJSON, BulkFormFieldJSON} from "./form.field";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {GenericHttpService} from "../../services/generic-http.service";
import {GenericFunctionService} from "../../services/generic-function.service";
import {NgBasicEditorComponent} from "../form-controls/editors/ng-basic-editor/ng-basic-editor.component";
import {NgStandardEditorComponent} from "../form-controls/editors/ng-standard-editor/ng-standard-editor.component";
import {NgProEditorComponent} from "../form-controls/editors/ng-pro-editor/ng-pro-editor.component";
import {NgEliteEditorComponent} from "../form-controls/editors/ng-elite-editor/ng-elite-editor.component";
import {TextEditorComponent} from "../form-controls/editors/text-editor/text-editor.component";
import {MatIconModule} from "@angular/material/icon";


@Component({
	selector: "app-formbuilder",
	templateUrl: "./formbuilder.component.html",
	styleUrls: ["./formbuilder.component.scss"],
	standalone: true,
	imports: [
		MatInputModule,
		MatRadioModule,
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
		///--------------------//
		NgBasicEditorComponent,
		NgStandardEditorComponent,
		NgProEditorComponent,
		NgEliteEditorComponent,
		TextEditorComponent,
		MatIconModule
	],
})
export class FormbuilderComponent {

	@Input() formActivity!: any;
	@Input() formErrorData!: any;
	@Input() componentData!: any;
	@Input() componentOptionDataFromParent!: any;
	@Input() backUrl!: any;
	@Input() bulkDataComponent!: any;
	@Input() existingWhList!: any;
	@Input() setCols!: any;
	@Output() formBuilderSubmit = new EventEmitter<any>();
	@Output() bulkInsertSubmit = new EventEmitter<any>();
	@Output() otherFieldsSubmit = new EventEmitter<any>();

	submitBtnVisibility: boolean = false;

	formFields: FormFieldJSON[] = [];
	formBulkFields: BulkFormFieldJSON[] = [];
	formBuilder = inject(FormBuilder);

	dynamicForm = this.formBuilder.group({});
	dynamicFormSubmitHandler = false;

	dynamicBulkForm = this.formBuilder.group({});
	dynamicFormBulkSubmitHandler = false;
	isformFieldsAvailabel = signal(false);
	isBulkInsertAvailabel = signal(false);

	formOtherFields: any[] = [];
	isformOtherFieldsAvailabel = signal(false);
	dynamicOtherFieldsForm = this.formBuilder.group({});
	dynamicOtherFieldsSubmitHandler = false;

	backUrlParams!: any;

	valueSubmitting: boolean = false;
	bulkValueSubmitting: boolean = false;
	formOtherFieldsSubmitting: boolean = false;
	channelId!: number;
	channelName!: string;
	cols: string = "";

	constructor (private store: Store<AppState>, private genFunctionService: GenericFunctionService, private genericHttp: GenericHttpService, private toastr: ToastrService, private locationService: LocationService, private el: ElementRef, private changeDetectorRef: ChangeDetectorRef) { }


	ngOnInit () {

		if (this.componentData.fields != undefined) {
			if (this.componentData.fields.length > 0) {
				this.formFields = this.componentData.fields;
				this.addComponent(this.componentData.fields);

				this.componentData.fields.map((item: any) => item.name != null ? item.name : null).forEach((item: any) => {
					item ? this.store.dispatch(addToDropdownArray(item)) : null;
				});

				this.isformFieldsAvailabel.set(true);

				if (this.setCols) {
					this.cols = "";
				}
				else if (this.componentData.fields.length < 3) {
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

			} else {
				this.isformFieldsAvailabel.set(false);
			}
		}

		if (this.bulkDataComponent != undefined) {
			if (this.bulkDataComponent.length > 0) {
				this.formBulkFields = this.bulkDataComponent;
				this.addBulkComponent(this.bulkDataComponent);
				this.isBulkInsertAvailabel.set(true);
			} else {
				this.isBulkInsertAvailabel.set(false);
			}
		}

		if (this.existingWhList != undefined) {
			if (this.existingWhList[0].options.length > 0) {
				this.formOtherFields = this.existingWhList;
				this.addOtherComponent(this.existingWhList);
				this.isformOtherFieldsAvailabel.set(true);
			} else {
				this.isformOtherFieldsAvailabel.set(false);
			}
		}

		// this.componentData.fields
		// 	.map((item: any) => item.name != null ? item : null)  // Only keep items with a valid name
		// 	.forEach((item: any) => {
		// 		if (item) {  // Make sure item is not null
		// 			item.options = [];  // Set options to an empty array
		// 			this.store.dispatch(addToDropdownArray(item));  // Dispatch the action
		// 		}
		// 	});
		// console.log(this.componentData.fields);



		// Get backurl params from store and set value to backurl with params
		this.store.select('store').subscribe({
			next: (response) => {
				this.backUrlParams = response.backUrl;
			}
		});



	}

	ngAfterViewInit () {

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
				this.bulkValueSubmitting = false;
			}
		}
	}

	get f (): {[key: string]: AbstractControl;} {
		return this.dynamicForm.controls;
		// return this.dynamicForm.controls;
	}

	get g (): {[key: string]: AbstractControl;} {
		return this.dynamicBulkForm.controls;
	}
	get dy (): {[key: string]: AbstractControl;} {
		return this.dynamicOtherFieldsForm.controls;
	}

	addBulkComponent (controls: BulkFormFieldJSON[]): void {
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
			this.dynamicBulkForm.addControl(
				control.name,
				this.formBuilder.control(control.value != null ? control.value : '', validators)
			);
		}
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

		let controlCount = 0;
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

			if (control.name == 'channel_id') {
				console.log(control);


				[
					{
						"value": 4,
						"label": "Telegram"
					},
					{
						"value": 3,
						"label": "Email"
					},
					{
						"value": 2,
						"label": "Whatsapp"
					},
					{
						"value": 1,
						"label": "Sms"
					}
				];
				this.channelId = control.value;
				const result = control.options.find(item => item.value === control.value);
				this.channelName = result ? result.label : '';
			}

			if (control.validators?.readonly) {
				controlCount++;
			}
		}

		this.submitBtnVisibility = controlCount == controls.length ? false : true;
	}

	saveForm () {
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

	saveBulkForm () {
		this.dynamicFormBulkSubmitHandler = true;
		if (this.dynamicBulkForm.invalid) {
			console.warn("Error=> ", this.dynamicBulkForm.value);
			return;
		} else {
			// console.log(this.dynamicBulkForm.value);
			this.bulkValueSubmitting = true;
			this.bulkInsertSubmit.emit({
				form: "bulk",
				storeUrl: this.bulkDataComponent[0].bulkInsertStoreUrl,
				data: this.dynamicBulkForm.value,
			});
		}
	}

	downloadeErrorFile (url: string) {
		this.genericHttp.getFileByUrl(url).subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					window.open(response.route, '_self');
				} else {
					this.toastr.error(`${ response.message }`, `${ 'Error' }`);
				}
			},
			error: (err: any) => {
				if (err.error.status) {
					this.changeDetectorRef.detectChanges();
					console.log(err);

				}
			},
			complete: () => {
				// console.log('completed');
				this.formBulkFields[0].downloadErrorFileUrl = '';
			}
		});

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

	onBulkFileUpdate (selectedFile: any) {
		if (selectedFile.data != null) {
			this.dynamicBulkForm.markAsDirty();
		}

		// this.dynamicForm.get(selectedFile.controlName)?.markAsDirty();
		this.dynamicBulkForm.patchValue({
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

	getEditorData (event: any) {
		if (this.dynamicForm.get(event.controlName)?.value == event.data) {

		} else {
			this.dynamicForm.patchValue({
				[event.controlName]: event.data,
			});
			this.dynamicForm.markAsDirty();
		}

		if (event.data == '<p></p>') {
			this.dynamicForm.patchValue({
				[event.controlName]: null,
			});
		} else if (event.data == '') {
			this.dynamicForm.patchValue({
				[event.controlName]: null,
			});
		}
	}
}
