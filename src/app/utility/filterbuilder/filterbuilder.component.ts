import {CommonModule} from "@angular/common";
import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, SimpleChanges} from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {MultiselectWithSearchComponent} from "../form-controls/multiselect-with-search/multiselect-with-search.component";
import {SelectWithSearchComponent} from "../form-controls/select-with-search/select-with-search.component";
import {MultipleFileUploadComponent} from "../form-controls/multiple-file-upload/multiple-file-upload.component";
import {DateRangeComponent} from "../form-controls/date-range/date-range.component";
import {DateComponent} from "../form-controls/date/date.component";
import {CheckboxComponent} from "../form-controls/checkbox/checkbox.component";
import {FormFieldJSON} from "../formbuilder/form.field";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {GenericFunctionService} from "../../services/generic-function.service";
import {Store} from "@ngrx/store";
import {AppState, addToDropdownArray} from "../store/store.reducer";
import {map, Observable, startWith} from "rxjs";
import {CheckboxGroupComponent} from "../form-controls/checkbox-group/checkbox-group.component";

@Component({
	selector: "app-filterbuilder",
	templateUrl: "./filterbuilder.component.html",
	styleUrls: ["./filterbuilder.component.scss"],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatRadioModule,
		MultiselectWithSearchComponent,
		SelectWithSearchComponent,
		CheckboxComponent,
		DateComponent,
		DateRangeComponent,
		CheckboxGroupComponent

	],
})
export class FilterbuilderComponent {
	@Input() componentData!: any;
	@Input() componentOptionDataFromParent!: any;
	@Input() filterPanel!: any;
	@Input() backUrl!: any;
	@Output() filterApplySubmit = new EventEmitter<any>();
	@Output() toggleFilterValue = new EventEmitter<any>();
	DataShow = true;
	formFields: FormFieldJSON[] = [];

	formBuilder = inject(FormBuilder);
	dynamicForm = this.formBuilder.group({});
	dynamicFormSubmitHandler = false;
	hasValue$: Observable<boolean> | undefined;


	constructor (private store: Store<AppState>, private genFunctionService: GenericFunctionService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private changeDetectorRef: ChangeDetectorRef) { }
	ngOnInit (): void {
		this.DataShow = true;
		this.formFields = this.componentData;
		this.addComponent(this.componentData);

		this.formFields.map((item: any) => item.name != null ? item.name : null).forEach((item: any) => {
			item ? this.store.dispatch(addToDropdownArray(item)) : null;
		});

		this.hasValue$ = this.dynamicForm.valueChanges.pipe(
			startWith(this.dynamicForm.value),
			map(formValue =>
				Object.values(formValue).some(value =>
					value !== null && value !== undefined && value !== ''
				)
			)
		);

	}

	get f (): {[key: string]: AbstractControl;} {
		return this.dynamicForm.controls;
		// return this.dynamicForm.controls;
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes["componentData"]) {
			let data = changes["componentData"].currentValue;
			if (data.length > 0) {
				// console.log(data);
				data.forEach((item: any) => {
					this.dynamicForm.patchValue({
						[item.name]: item.value,
					});
				});
			}
		}

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
			}
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


	applyFilter () {
		this.dynamicFormSubmitHandler = true;
		if (this.dynamicForm.invalid) {
			console.warn("Error=> ", this.dynamicForm.value);
			return;
		} else {
			// console.log(this.dynamicForm.value);
			this.filterApplySubmit.emit(this.dynamicForm.value);
			this.toggleFilterValue.emit(this.filterPanel);
		}
	}

	resetFilter () {
		// console.log("reset");

		this.dynamicForm.reset();

		this.filterApplySubmit.emit(this.dynamicForm.value);
		this.toggleFilterValue.emit(this.filterPanel);
		this.DataShow = false;
		if (this.DataShow == false) {
			setTimeout(() => {
				this.reRenderComponent();
			}, 500);
		}

	}

	reRenderComponent () {
		this.DataShow = true;
		this.formFields = this.componentData;
		this.addComponent(this.componentData);
	}

	toggleFilter () {
		this.toggleFilterValue.emit(this.filterPanel);
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
	getChildDlOptionsByParentId (event: any) {
		this.componentOptionDataFromParent = event;
		this.changeDetectorRef.detectChanges();

	}
}
