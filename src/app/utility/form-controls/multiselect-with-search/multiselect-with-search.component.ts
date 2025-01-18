
import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
} from "@angular/core";
import {
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {Observable, of} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {GenericHttpService} from "../../../services/generic-http.service";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
	selector: "app-multiselect-with-search",
	templateUrl: "./multiselect-with-search.component.html",
	styleUrls: ["./multiselect-with-search.component.scss"],
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule, MatIconModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultiselectWithSearchComponent implements OnInit {
	@Input() formActivity!: any;
	@Input() componentData: any;
	@Input() optionData: any;

	@Output() selectionUpdate = new EventEmitter<any>();

	@Output() childOptionUpdateByParentId = new EventEmitter<any>();

	@ViewChild("search") searchTextBox!: ElementRef;

	selectFormControl = new FormControl();
	searchTextboxControl = new FormControl();
	selectedValues: any[] = [];
	data: any[] = [];
	selectedNamesList: string[] = [];

	filteredOptions: Observable<any[]> | undefined;

	constructor (private genericHttp: GenericHttpService) { }

	ngOnInit () {
		this.data = this.componentData.options;
		this.selectedValues = this.componentData.value;

		// console.log(this.componentData.validators?.required);

		this.selectFormControl.setValue(this.selectedValues);

		if (this.componentData.validators?.required) {
			this.selectFormControl = new FormControl(this.selectedValues, [
				Validators.required,
			]);
		} if (this.componentData.validators?.readonly) {
			this.selectFormControl = new FormControl(this.selectedValues);
			this.selectFormControl?.disable();

		} else {
			this.selectFormControl = new FormControl(this.selectedValues);
		}


		/**
		 * Set filter event based on value changes
		 */
		this.filteredOptions = this.searchTextboxControl.valueChanges.pipe(
			startWith<string>(''),
			map((label) => this._filter(label))
		);

		if (this.componentData.name == 'activity_id') {
			this.getActivities();
		}

		if (this.componentData.name == 'permission_id') {
			this.getActivityPermissions();
		}

		// console.log(this.componentData.name);
	}


	ngOnChanges (changes: SimpleChanges) {
		if (changes["optionData"].currentValue) {
			let data = changes["optionData"].currentValue;
			// console.log(data);
			if (this.componentData.name == data.controlName) {
				this.data = [...data.data];
				this.componentData.options = [...data.data];
				this.filteredOptions = of(this.data);
				this.selectedValues = this.componentData.value;
				this.selectFormControl.setValue(this.selectedValues);
				this.filteredOptions = this.searchTextboxControl.valueChanges.pipe(
					startWith<string>(""),
					map((label) => this._filter(label))
				);
			}
		}
	}

	/**
	 * Used to filter data based on search input
	 */
	private _filter (label: string): String[] {
		const filterValue = label.toLowerCase();
		// Set selected values to retain the selected checkbox state
		this.setSelectedValues();
		this.selectFormControl.patchValue(this.selectedValues);
		let filteredList = this.data.filter(
			(item: {label: string;}) =>
				item.label.toLowerCase().indexOf(filterValue) === 0
		);
		return filteredList;
	}

	/**
	 * Remove from selected values based on uncheck
	 */
	// selectionChange (event: {isUserInput: any; source: {selected: boolean; value: any;};}) {
	//     if (event.isUserInput && event.source.selected == false) {
	//         let index = this.selectedValues.indexOf(event.source.value);
	//         this.selectedValues.splice(index, 1);
	//     }
	// }

	selectionChange (event: {isUserInput: any; source: {selected: boolean; value: any;};}) {
		if (event.isUserInput) {
			if (event.source.selected) {
				// Add the selected value to the selectedValues array
				if (this.selectedValues.indexOf(event.source.value) === -1) {
					this.selectedValues.push(event.source.value);
				}
			} else {
				// Remove the unselected value from the selectedValues array
				const index = this.selectedValues.indexOf(event.source.value);
				if (index !== -1) {
					this.selectedValues.splice(index, 1);
				}
			}
		}
	}


	openedChange (e: boolean) {
		this.searchTextboxControl.patchValue('');
		if (!e) { // Dropdown is closing
			// Emit selection update event with updated selected values
			this.selectionUpdate.emit({
				controlName: this.componentData.name,
				data: this.selectFormControl.value,
			});
		}
		if (e == true) {
			this.searchTextBox.nativeElement.focus();
		}
	}

	/**
	 * Clearing search textbox value
	 */
	clearSearch (event: {stopPropagation: () => void;}) {
		event.stopPropagation();
		this.searchTextboxControl.patchValue('');
	}

	/**
	 * Set selected values to retain the state
	 */
	setSelectedValues () {
		if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
			this.selectFormControl.value.forEach((e: any) => {
				if (this.selectedValues.indexOf(e) == -1) {
					this.selectedValues.push(e);
				}
			});
			if (this.selectedValues !== this.selectFormControl.value) {

				// console.log('selectFormControl', this.selectFormControl.value);
				this.selectionUpdate.emit({
					controlName: this.componentData.name,
					data: this.selectFormControl.value,
				});
			}
		}
	}


	getActivities () {
		this.genericHttp.getActivityDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'activity_id',
						data: response.data,
					});
				}
			},
			error: (err: Error) => {
				console.log(err);
			},
			complete: () => {
				// // console.log("completed");
			},
		});
	}

	getActivityPermissions () {
		this.genericHttp.getActivityPermissionDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'permission_id',
						data: response.data,
					});
				}
			},
			error: (err: Error) => {
				console.log(err);
			},
			complete: () => {
				// // console.log("completed");
			},
		});
	}

	getSelectedOptionNames (): string[] {
		if (this.selectFormControl.value) {
			this.selectedNamesList = this.selectFormControl.value
				.map(
					(selectedId: any) =>
						this.componentData.options.find(
							(options: {value: any;}) => options.value === selectedId
						)?.label
				)
				.filter((label: any) => label);

			return this.selectedNamesList;
			// return selectedNames.join(", ");
			// return selectedNames[0];
		}
		return [];
	}
}
