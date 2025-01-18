import {CommonModule} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, ChangeDetectorRef, SimpleChanges, inject, } from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule, } from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
	selector: "app-checkbox-group",
	templateUrl: "./checkbox-group.component.html",
	styleUrls: ["./checkbox-group.component.scss"],
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, CommonModule, MatCheckboxModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxGroupComponent {
	formBuilder = inject(FormBuilder);
	dynamicCheckbox = this.formBuilder.group({});
	checkboxFields!: any;
	checking: boolean = false;
	selectedValue: any[] = [];
	disabledValues: any[] = [];
	@Input() componentData: any;
	@Input() optionData!: any;
	@Input() valuesData!: any;
	@Input() disabledData!: any;

	data: any;

	@Output() checkboxUpdate = new EventEmitter<any>();
	@Output() childOptionUpdateByParentId = new EventEmitter<any>();
	constructor (
		private cdRef: ChangeDetectorRef,
	) { }

	ngOnInit (): void {
		this.checkboxFields = this.componentData.options;
		this.selectedValue = this.componentData.value;
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes["optionData"]?.currentValue) {
			let data = changes["optionData"].currentValue;
			if (this.componentData.name == data.controlName) {
				this.data = [...data.data];
				this.componentData.options = [...data.data];
				this.checkboxFields = this.componentData.options;
			}
		}


		if (changes["valuesData"]?.currentValue) {
			let data = changes["valuesData"].currentValue;
			this.selectedValue = data;
		}

		if (changes["disabledData"]?.currentValue) {
			let data = changes["disabledData"].currentValue;
			this.disabledValues = data;

			// if (this.componentData.name == data.controlName) {
			// 	this.data = [...data.data];
			// 	this.componentData.options = [...data.data];
			// 	this.checkboxFields = this.componentData.options;
			// }
		}

		// console.log(changes);
		// if (changes["componentData"].currentValue) {
		// 	let data = changes["componentData"].currentValue;
		// 	console.log(data);

		// 	// if (this.componentData.name == data.controlName) {
		// 	// 	this.data = [...data.data];
		// 	// 	this.componentData.options = [...data.data];
		// 	// 	this.checkboxFields = this.componentData.options;
		// 	// }
		// }
	}

	selectionChange (value: number) {
		const index = this.selectedValue.indexOf(value);
		if (index === -1) {
			this.selectedValue.push(value);
		} else {
			this.selectedValue.splice(index, 1);
		}

		this.checkboxUpdate.emit({
			controlName: this.componentData.name,
			data: this.selectedValue,
		});
		this.cdRef.detectChanges();
		this.checking = true;
	}

}
