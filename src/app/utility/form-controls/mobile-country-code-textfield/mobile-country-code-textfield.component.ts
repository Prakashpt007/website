
import { HttpClient } from '@angular/common/http';
import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import axios from 'axios';
import {CountryDataService} from '../../../services/country-data.service';

@Component({
	selector: 'app-mobile-country-code-textfield',
	templateUrl: './mobile-country-code-textfield.component.html',
	styleUrls: ['./mobile-country-code-textfield.component.scss'],
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
})
export class MobileCountryCodeTextfieldComponent {
	@Input() formActivity!: any;
	@Input() componentData: any;
	@Output() selectionUpdate = new EventEmitter<any>();

	@Output() childOptionUpdateByParentId = new EventEmitter<any>();

	countryData: any;
	constructor (private http: HttpClient, private countryDataService: CountryDataService) {
	}

	ngOnInit (): void {
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes["optionData"].currentValue) {
			let data = changes["optionData"].currentValue;
			console.log(data);
		}
	}
	ngAfterViewInit () { }

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
}
