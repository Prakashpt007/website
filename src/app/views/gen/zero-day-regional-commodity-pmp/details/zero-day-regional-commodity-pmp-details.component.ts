import {ChangeDetectorRef, Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: 'app-zero-day-regional-commodity-pmp-details',
	templateUrl: './zero-day-regional-commodity-pmp-details.component.html',
	styleUrl: './zero-day-regional-commodity-pmp-details.component.scss',
	standalone: false
})
export class ZeroDayRegionalCommodityPmpDetailsComponent {

	showFormBuilder: boolean = false;
	formData: any;
	formErrorData: any = {};


	newDynamicForm: FormGroup;
	newDynamicFormSubmitHandler: boolean = false;
	newFormShow: boolean = false;
	isListEmpty!: boolean;

	typeOptions: string[] = [];
	submitBtnStatus: boolean = false;
	priceStoreUrl = "gen/zero-day-regional-commodity-pmp/update-price";

	constructor (private genericHttp: GenericHttpService, public formBuilder: FormBuilder,
		private toastr: ToastrService, private changeDetectorRef: ChangeDetectorRef) {
		// this.titleService.setTitle("Some title");

		this.formData = {
			fields: [
				{
					"name": "region_id",
					"label": "Region",
					"type": "select",
					"validators": {
						"required": true,
						"readonly": false
					},
					"options": [],
					"value": ""
				},
				{
					"name": "commodity_id",
					"label": "Commodity",
					"type": "select",
					"validators": {
						"required": true,
						"readonly": false
					},
					"options": [],
					"value": ""
				},
				{
					"name": "parent_variety_id",
					"label": "Parent Variety",
					"type": "select",
					"validators": {
						"required": true,
						"readonly": false
					},
					"options": [],
					"value": ""
				},
				{
					"name": "quality_band_id",
					"label": "Quality Band",
					"type": "select",
					"validators": {
						"required": true,
						"readonly": false
					},
					"options": [],
					"value": ""
				},
				{
					"name": "date",
					"label": "Date",
					"type": "date",
					"validators": {
						"required": true,
						"readonly": false
					},
					"options": [],
					"value": ""
				}
			],
			formStoreUrl: "gen/zero-day-regional-commodity-pmp/list"
		};

		this.newDynamicForm = this.formBuilder.group({
			items: this.formBuilder.array([]),
		});
	}

	ngOnInit () {

		this.showFormBuilder = true;
		this.newDynamicForm.valueChanges.subscribe((data: any) => {
			if (data) {
				this.submitBtnStatus = true;
			}
		});
	}

	dynamicFormSubmit () {

		if (this.newDynamicForm.valid) {
			const formValue = this.newDynamicForm.value.items; // Extract the items Array

			this.genericHttp.storeFormData(formValue, this.priceStoreUrl).subscribe({
				next: (response: any) => {
					if (response.status == 200 && response.success) {

						// this.newFormShow = false;
						this.toastr.success(`Data Update Successfully`, `Success`);

						// const items = this.newDynamicForm.get('items') as FormArray;

						// // Clear the existing form array
						// while (items.length) {
						// 	items.removeAt(0);
						// }

						// setTimeout(() => {
						// 	this.submitBtnStatus = false;
						// 	this.newFormShow = false;
						// }, 1000);
						this.submitBtnStatus = false;
					} else {
						alert('Error');
					}
				},
				error: (err: any) => {
					this.toastr.error(err.error.message, `Error`);

				},
				complete: () => {
					// console.log("completed");
				},
			});
		} else {
			console.error("Form is invalid");
		}

	}

	getFormValuesFromBuilder (event: any) {

		this.genericHttp.storeFormData(event.data, event['storeUrl']).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {

					const items = this.newDynamicForm.get('items') as FormArray;

					// Clear the existing form array
					while (items.length) {
						items.removeAt(0);
					}

					if (response.data.length > 0) {
						this.isListEmpty = false;
						this.generateDynamicForm(response.data);
					} else {
						this.isListEmpty = true;
					}

				} else {
					alert('Error');
				}
			},
			error: (err: any) => {
				if (err.error.status) {
					this.formErrorData = err.error.data.formData.errors;
					this.changeDetectorRef.detectChanges();
				}
			},
			complete: () => {
				// console.log("completed");
			},
		});

	}

	generateDynamicForm (dataArray: Array<any>) {
		const items = this.newDynamicForm.get('items') as FormArray;

		// Clear the existing form array
		while (items.length) {
			items.removeAt(0);
		}

		this.typeOptions = dataArray[0].type.options;

		// Recreate the form array with new data
		dataArray.forEach((data) => {
			items.push(
				this.formBuilder.group({
					id: [data.id],
					delivery_date: [data.delivery_date],
					price_paisa: [data.price_paisa, [Validators.required, Validators.pattern('^[0-9]+$')]], // Required + Numeric Validator
					type: [data.type.value, [Validators.required]],
				})
			);
		});
		this.newFormShow = true;
		this.submitBtnStatus = false;
		if (this.newFormShow) {
			this.isListEmpty = false;
		} else {
			this.isListEmpty = true;
		}
	}

	get items (): FormArray {
		return this.newDynamicForm.get('items') as FormArray;
	}

	restrictInput (event: KeyboardEvent) {
		const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
		if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
			event.preventDefault();
		}
	}

	formatCamelCase (input: string): string {
		// Remove underscores and split by space or camel case pattern
		const words = input
			.replace(/_/g, " ") // Replace underscores with spaces
			.replace(/([a-z])([A-Z])/g, "$1 $2") // Split camelCase into words
			.split(" ");

		// Capitalize the first letter of each word and make the rest lowercase
		return words
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" ");
	}

}
