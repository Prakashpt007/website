
import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	ElementRef,
	EventEmitter,
	Input,
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
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {of} from 'rxjs';
import {map, startWith} from "rxjs/operators";
import {AppState} from "../../store/store.reducer";
import {LocationService} from "../../../services/location.service";
import {GenericHttpService} from "../../../services/generic-http.service";
import {MatButtonModule} from "@angular/material/button";
import {MatOption} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';

@Component({
	selector: "app-select-with-search",
	templateUrl: "./select-with-search.component.html",
	styleUrls: ["./select-with-search.component.scss"],
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule, MatIconModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectWithSearchComponent {
	@Input() formActivity!: any;
	@Input() componentData: any;
	@Input() optionData: any;

	@Output() selectionUpdate = new EventEmitter<any>();

	@Output() childOptionUpdateByParentId = new EventEmitter<any>();

	@ViewChild("search") searchTextBox!: ElementRef;

	dependendArry: Array<any> = [
		{
			parent: "commodity_id",
			child: "parent_variety_id"
		},
		{
			parent: "commodity_id",
			child: "variety_id"
		},
		{
			parent: "state_id",
			child: "district_id"
		},
		{
			parent: "region_id",
			child: "warehouse_id"
		}
	];

	selectFormControl = new FormControl();
	searchTextboxControl = new FormControl();
	selectedValue: any;

	filteredOptions!: Observable<any[]>;
	data: any;
	selectedName!: any;

	dropdownArrayList!: any;
	constructor (private store: Store<AppState>, private locationService: LocationService, private genericHttp: GenericHttpService) { }

	ngOnInit (): void {

		this.componentData.options = this.componentData.options.filter((item: {label: string; value: number;}) => !(item.label === "Dashboard" && item.value === 1));

		this.data = this.componentData.options;
		this.selectedValue = this.componentData.value;

		// console.log(this.selectedValue);

		this.selectFormControl.setValue(this.selectedValue);

		if (this.componentData.validators?.required) {
			this.selectFormControl = new FormControl(this.selectedValue, [Validators.required,]);

		} if (this.componentData.validators?.readonly) {
			this.selectFormControl = new FormControl(this.selectedValue);
			this.selectFormControl?.disable();

		} else {
			this.selectFormControl = new FormControl(this.selectedValue);
		}

		this.filteredOptions = this.searchTextboxControl.valueChanges.pipe(
			startWith<string>(""),
			map((label) => this._filter(label))
		);

		// Listen for changes on the selectControl
		this.selectFormControl.valueChanges.subscribe((selectedValue) => {

			this.onSelectChange(selectedValue);
		});

		this.store.select('store').subscribe({
			next: (response) => {
				this.dropdownArrayList = response.dropdownArray;
			}
		});


		if (this.componentData.name == 'language_id' && this.componentData.options.length == 0) {
			this.getLanguages();
		}

		if (this.componentData.name == 'crop_type_id' && this.componentData.options.length == 0) {
			this.getCropTypes();
		}

		if (this.componentData.name == 'activity_id' && this.componentData.options.length == 0) {
			this.getActivities();
		}

		if (this.componentData.name == 'permission_id' && this.componentData.options.length == 0) {
			this.getActivityPermissions();
		}

		if (this.componentData.name == 'region_id' && this.componentData.options.length == 0) {
			this.getRegions();
		}

		if (this.componentData.name == 'access_id' && this.componentData.options.length == 0) {
			this.getAccessGroup();
		}

		if (this.componentData.name == 'commodity_id' && this.componentData.options.length == 0) {
			this.getCommodities();
		}

		if (this.componentData.name == 'state_id' && this.componentData.options.length == 0) {
			this.getStates();
		}

		if (this.componentData.name == 'quality_band_id' && this.componentData.options.length == 0) {
			this.getQuantityBands();
		}

		if (this.componentData.name == 'assignedRegion' && this.componentData.options.length == 0) {
			this.getAssignedRegions();
		}

		// console.log(this.componentData.name);

		// if (this.formActivity == 'edit') {
		// 	this.setSelectedValue();
		// 	return;
		// }


	}

	onSelectChange (selectedValue: any) {
		this.setSelectedValue();
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes["optionData"].currentValue) {
			let data = changes["optionData"].currentValue;

			// item.child == changes["optionData"].currentValue.controlName
			if (this.componentData.name == data.controlName) {
				this.data = [...data.data];
				this.componentData.options = [...data.data];
				this.filteredOptions = of(this.data);

				this.selectedValue = this.componentData.value;
				this.selectFormControl.setValue(this.selectedValue);


				this.filteredOptions = this.searchTextboxControl.valueChanges.pipe(
					startWith<string>(""),
					map((label) => this._filter(label))
				);
			}

			// if (changes['optionData'].currentValue.controlName == this.selectFormControl) {
			// 	this.selectFormControl.setValue(null);
			// 	return;
			// } else {
			// 	this.selectFormControl.setValue(this.selectedValue);
			// 	return;
			// }
		}



		// Set option data that comming from parent by parent Id
		// console.log(this.optionData);

		// if (this.optionData != undefined) {
		//   console.log(this.componentData.name);
		//   console.log(this.optionData['controlName']);

		//   if (this.componentData.name == this.optionData['controlName']) {
		//     console.log('yes');
		//     console.log(this.optionData);
		//     console.log(this.componentData.name);
		//   } else {
		//     console.log('no');
		//   }
		// }
	}

	ngAfterViewInit () { }

	private _filter (label: string): String[] {
		const filterValue = label.toLowerCase();
		// this.selectFormControl.patchValue(this.selectedValue);
		return this.componentData.options.filter((item: {label: string;}) =>
			item.label.toLowerCase().includes(filterValue)

		);
	}

	selectionChangeEvent (event: {
		isUserInput: any;
		source: {selected: boolean; value: any;};
	}) {
		// // reset or clear value if use select the same value
		// if (event.isUserInput && (event.source.value == this.selectedValue)) {
		//   this.selectedValue = '';
		//   this.selectFormControl.setValue(this.selectedValue);
		//   this.setSelectedValue();
		//   return;
		// };

		if (event.isUserInput && event.source.selected === true) {
			this.selectedValue = event.source.value;
		}
	}

	openedChange (e: boolean) {
		this.searchTextboxControl.patchValue("");
		if (e === true) {
			this.searchTextBox.nativeElement.focus();
		}
	}

	clearSearch (event: {stopPropagation: () => void;}) {
		event.stopPropagation();
		this.searchTextboxControl.patchValue("");
	}

	setSelectedValue () {
		// console.log(this.componentData.name);

		this.selectionUpdate.emit({
			controlName: this.componentData.name,
			data: this.selectFormControl.value,
		});

		if (this.selectFormControl.value) {
			this.selectedValue = this.selectFormControl.value;
		}
		// if (this.componentData.name == 'country_id') {
		//   this.getStateByCountryId(this.selectFormControl.value)
		// }

		if (this.componentData.name == 'state_id') {
			if (this.selectFormControl.value) {
				this.getDistrictByStateId(this.selectFormControl.value);
			}
		}

		if (this.componentData.name == 'commodity_id') {
			if (this.selectFormControl.value) {
				this.getParentVarietyByCommodityId(this.selectFormControl.value);
			}
		}

		if (this.componentData.name == 'region_id') {
			if (this.selectFormControl.value) {
				this.getReportingManagersByRegionId(this.selectFormControl.value);
				this.getWarehouseListByRegionId(this.selectFormControl.value);
			}
		}


		// if (this.componentData.name == 'assignedRegion') {
		//     if (this.selectFormControl.value) {
		//         this.getReportingManagersByRegionId(this.selectFormControl.value);
		//     }
		// }

		// if (this.componentData.name == 'activity_id') {
		//   this.getActivities()
		// }


	}

	getSelectedOptionNames (value: number): string | null {
		this.selectedName = this.componentData.options.find(
			(obj: {value: number;}) => obj.value === value
		);
		return this.selectedName ? this.selectedName.label : "";
	}


	getStates () {
		this.locationService.getStateDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'state_id',
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

	getLanguages () {
		this.genericHttp.getLanguageDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'language_id',
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

	getActivities () {
		this.genericHttp.getActivityDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'activity_id',
						data: response.data,
					});
					return;
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

	getRegions () {
		this.genericHttp.getRegionDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'region_id',
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



	getAccessGroup () {
		this.genericHttp.getAccessGroupDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'access_id',
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

	getCommodities () {
		this.genericHttp.getCommodityDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'commodity_id',
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

	getQuantityBands () {
		this.genericHttp.getQualityBandDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'quality_band_id',
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

	getAssignedRegions () {
		this.genericHttp.getRegionDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'assignedRegion',
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

	getCropTypes () {
		this.genericHttp.getCropTypeDList().subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.status) {
					this.childOptionUpdateByParentId.emit({
						controlName: 'crop_type_id',
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


	getReportingManagersByRegionId (regionid: number) {
		if (regionid != undefined) {
			if (this.dropdownArrayList.includes('repoting_manager_user_id', 0)) {
				this.genericHttp.getReportingManagersByRegionId(regionid).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.status) {
							this.childOptionUpdateByParentId.emit({
								controlName: 'repoting_manager_user_id',
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
		}

	}
	getWarehouseListByRegionId (regionid: number) {
		if (regionid != undefined) {
			if (this.dropdownArrayList.includes('warehouse_id', 0)) {
				this.genericHttp.getWarehouseListByRegionId(regionid).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.status) {
							this.childOptionUpdateByParentId.emit({
								controlName: 'warehouse_id',
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
		}
	}


	getDistrictByStateId (state_id: number) {
		if (state_id != undefined) {
			if (this.dropdownArrayList.includes('district_id', 0)) {
				this.locationService.getDistrictDList(state_id).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.status) {
							this.childOptionUpdateByParentId.emit({
								controlName: 'district_id',
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
		}
	}

	getParentVarietyByCommodityId (commodity_id: number) {
		if (commodity_id != undefined) {
			if (this.dropdownArrayList.includes('variety_id', 0)) {
				this.genericHttp.getParentVarietyDList(commodity_id).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.status) {
							this.childOptionUpdateByParentId.emit({
								controlName: 'variety_id',
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

			if (this.dropdownArrayList.includes('parent_variety_id', 0)) {
				this.genericHttp.getParentVarietyDList(commodity_id).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.status) {
							this.childOptionUpdateByParentId.emit({
								controlName: 'parent_variety_id',
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
		}
	}
}

