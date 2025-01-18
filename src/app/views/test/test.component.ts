import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {select} from '@ngrx/store';
interface Item {
	value: string;
	label: string;
}


@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule]
})


export class TestComponent {





	sampleObj: any = {
		"name": "John Deo",
		"age": 30,
		"occupation": "Software Developer",
		"data": {
			"address": "nagpur",
			"city": "nagpur"
		}
	};
	flattenedPersonWithoutDataPrefix: Array<{key: string, value: any;}> = [];


	form!: FormGroup;
	formSubmitHandler = false;
	selectValue: string = 'item-3';
	selectLabel!: string;

	dlList: Item[] = [
		{value: 'item-1', label: 'Item 1'},
		{value: 'item-2', label: 'Item 2'},
		{value: 'item-3', label: 'Item 3'},
		{value: 'item-4', label: 'Item 4'},
		{value: 'item-5', label: 'Item 5'},
		{value: 'item-6', label: 'Item 6'},
		{value: 'item-7', label: 'Item 7'},
		{value: 'item-8', label: 'Item 8'}
	];

	constructor (public formBuilder: FormBuilder) {
		console.log('constructor called..');

		const flattenedPerson = this.flattenObject(this.sampleObj);
		this.flattenedPersonWithoutDataPrefix = flattenedPerson.map(({key, value}) => {
			return {key: key.replace('data.', ''), value};
		});
	}

	flattenObject (obj: any, parentKey: string = ''): Array<{key: string, value: any;}> {
		const flattenedArray: Array<{key: string, value: any;}> = [];

		for (const key in obj) {
			const value = obj[key];

			if (typeof value === 'object' && value !== null) {
				const currentKey = key === 'data' ? key : parentKey ? `${ parentKey }.${ key }` : key;
				flattenedArray.push(...this.flattenObject(value, currentKey));
			} else {
				flattenedArray.push({key: parentKey ? `${ parentKey }.${ key }` : key, value});
			}
		}

		return flattenedArray;
	}

	ngOnInit () {
		console.log('ngOnInit called..');

		this.form = this.formBuilder.group({
			selectbox: ["", [Validators.required]],
		});

	}
	get f (): {[key: string]: AbstractControl;} {
		return this.form.controls;
	}

	onchange (event: any) {
		this.selectValue = event.target.value;
		this.selectLabel = event.target.innerText;
	}

	getSelectedValue (value: any) {
		return this.selectValue == value ? true : false;
	}

	formSubmit () {
		this.formSubmitHandler = true;
		if (this.form.invalid) {
			return;
		} else {
			console.log(this.form.value);

		}
	}

	ngAfterViewInit () {
		var dd!: Item[];

		if (this.selectValue != undefined) {
			dd = this.dlList.filter((item: any) => (item.value === this.selectValue) ? item.label : '');

		}
		if (dd) {
			this.selectLabel = dd[0].label;
		} else {
			console.log('Value not found');
		}
	}

	// object loop fn


	objectKeys (obj: any) {
		return Object.keys(obj);
	}



	getObjectValueByKey (obj: any, key: string) {
		return obj[key];
	}


	getObjectsValue (obj: any) {
		console.log(obj);

		return Object.values(obj);
	}


	checkctype (val: any) {
		if (Array.isArray(val)) {
			return true;
		} else {
			return false;
		}



	}
}
