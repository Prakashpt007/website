
import {HttpClient} from "@angular/common/http";
import {
	Component,
	EventEmitter,
	Input,
	Output,
	SimpleChanges,
} from "@angular/core";
import {
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {Observable} from "rxjs";
import {of} from 'rxjs';

import axios from 'axios';
import {MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import {CommonModule} from "@angular/common";

@Component({
	selector: 'app-mobile-country-code',
	templateUrl: './mobile-country-code.component.html',
	styleUrls: ['./mobile-country-code.component.scss'],
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatOption, MatSelect, MatSelectTrigger, CommonModule],
})
export class MobileCountryCodeComponent {
	@Input() formActivity!: any;
	@Input() componentData: any;
	@Input() optionData: any;

	@Output() selectionUpdate = new EventEmitter<any>();

	@Output() childOptionUpdateByParentId = new EventEmitter<any>();

	selectFormControl = new FormControl();
	selectedValue: any;

	filteredOptions!: Observable<any[]>;
	data: any;
	selectedName!: any;

	countryData: any;
	constructor (private http: HttpClient) {
	}

	ngOnInit (): void {
		// console.log(this.componentData);

		this.data = this.componentData.options;
		this.selectedValue = this.componentData.value;

		// console.log(this.componentData.validators?.required);

		this.selectFormControl.setValue(this.selectedValue);

		if (this.componentData.validators?.required) {
			this.selectFormControl = new FormControl(this.selectedValue, [
				Validators.required,
			]);
		} else {
			this.selectFormControl = new FormControl(this.selectedValue);
		}


		// Listen for changes on the selectControl
		this.selectFormControl.valueChanges.subscribe((selectedValue) => {
			this.onSelectChange(selectedValue);
		});

		if (this.formActivity == 'edit') {
			this.setSelectedValue();
		}


		this.fetchData();
		// console.log(this.componentData.name);


	}

	onSelectChange (selectedValue: any) {
		this.setSelectedValue();
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes["optionData"].currentValue) {
			let data = changes["optionData"].currentValue;
			// console.log(data);
			if (this.componentData.name == data.controlName) {
				this.data = [...data.data];
				this.componentData.options = [...data.data];
				this.filteredOptions = of(this.data);
				this.selectedValue = this.componentData.value;
				this.selectFormControl.setValue(this.selectedValue);
			}
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

	selectionChangeEvent (event: {
		isUserInput: any;
		source: {selected: boolean; value: any;};
	}) {
		if (event.isUserInput && event.source.selected === true) {
			this.selectedValue = event.source.value;
		}
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


	}

	getSelectedOptionNames (value: number): string | null {
		this.selectedName = this.componentData.options.find(
			(obj: {value: number;}) => obj.value === value
		);
		return this.selectedName ? this.selectedName.label : "";
	}


	// getStateByCountryId(countryId: number) {
	//   // console.log(countryId);
	//   this.locationService.getStateDList(countryId).subscribe({
	//     next: (response: any) => {
	//       response.data;
	//       console.log(response.data);

	//     },
	//     error: (err: Error) => {
	//       console.log(err);
	//     },
	//     complete: () => {
	// console.log("completed");
	//     },
	//   });

	// }



	async fetchData (): Promise<void> {
		const apiUrl = 'https://ipapi.co/json';
		try {
			const data = await axios.get(apiUrl);
			// Handle the API response here

			const mobileCountryCode = data.data.country_calling_code;
			const countryName = data.data.country_name;
			// console.log(countryData.country_calling_code);
			// const dd = [{
			//   name: this.countryData,
			//   label: this.countryData
			// }]


			// this.countryData = '+91, +92, +93'


			// const countryString = '+91, +92, +93';
			const countryArray = mobileCountryCode.split(', ').filter(Boolean);
			console.log(countryName);


			this.countryData = countryArray.map((value: any) => ({
				value: value,
				label: `${ value } (${ countryName })`,
			}));

			this.childOptionUpdateByParentId.emit({
				controlName: 'mobileNoCountryCode',
				// data: this.countryData.replaceAll(' ', '').split(','),
				data: this.countryData
			});

		} catch (error) {
			// Handle errors
		}
	}

	multipleValuesSet (valueToBeSet: any) {
		let returnValue: any;
		if (Array.isArray(valueToBeSet)) {
			returnValue = valueToBeSet.join(',');
		} else {
			returnValue = valueToBeSet;
		}
		return returnValue;
	}

}

