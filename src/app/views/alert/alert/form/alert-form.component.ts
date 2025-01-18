import {ChangeDetectorRef, Component, inject} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GenericHttpService} from "../../../../services/generic-http.service";
import {AppState} from "../../../../utility/store/store.reducer";
import {Store} from "@ngrx/store";
import {FormFieldJSON} from "../../../../utility/formbuilder/form.field";
import {AbstractControl, FormArray, FormBuilder, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
@Component({
	selector: 'app-alert-form',
	templateUrl: './alert-form.component.html',
	styleUrl: './alert-form.component.scss',
	standalone: false
})
export class AlertFormComponent {
	showFormBuilder: boolean = false;
	componentData: any;
	pageId!: any;
	backUrlParams!: any;
	backUrl = `/alert/alert/list`;
	formAddUrl = `alert/alert/create`;
	formEditUrl = `alert/alert`;
	formErrorData: any = {};

	formBuilder = inject(FormBuilder);

	formActivity: string = "";
	dynamicForm = this.formBuilder.group({});
	dynamicFormSubmitHandler = false;
	checkboxOption!: any[];
	channelData: any[] = [];
	editorDetails: any[] = [];
	background: ThemePalette = "primary";
	valueSubmitting: boolean = false;
	constructor (private store: Store<AppState>, private genericHttp: GenericHttpService, private router: Router,
		private route: ActivatedRoute, private toastr: ToastrService, private changeDetectorRef: ChangeDetectorRef) {
		// this.titleService.setTitle("Some title");
	}

	// ngOnInit () {
	// 	this.dynamicFormField();
	// 	this.formActivity = "add";
	// }

	ngOnInit () {

		if (this.route.snapshot.paramMap.get("id") != null) {
			this.pageId = Number(`${ this.route.snapshot.paramMap.get("id") }`);
			this.dynamicFormEditField();
			this.formActivity = "edit";
			this.store.select('store').subscribe({
				next: (response) => {
					this.backUrlParams = response.backUrl;
				}
			});
		} else {
			this.dynamicFormField();
			this.formActivity = "add";
		}
	}
	get f (): {[key: string]: AbstractControl;} {
		return this.dynamicForm.controls;
		// return this.dynamicForm.controls;
	}

	dynamicFormField () {
		this.genericHttp.getFormData(this.formAddUrl).subscribe({
			// this.genericHttp.getDummyData('assets/jsons/alert-add.json').subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.componentData = response.data.formData;
					this.checkboxOption = this.componentData.fields.filter((item: any) => item.type === 'checkbox');
					this.addComponent(this.componentData.fields);
				}

			},
			error: (err: any) => {
				if (err.error) {
					this.toastr.error(`${ err.error.message }`, `${ err.status } ${ err.statusText }`);
				}
			},
			complete: () => {
				// console.log("completed");
				this.showFormBuilder = true;
			},
		});
	}

	dynamicFormEditField () {
		this.genericHttp.getFormData(this.formEditUrl + "/" + `${ this.pageId }` + "/edit").subscribe({
			// this.genericHttp.getDummyData('assets/jsons/alert-edit.json').subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.componentData = response.data.formData;
					this.checkboxOption = this.componentData.fields.filter((item: any) => item.type === 'checkbox');
					this.showFormBuilder = true;
					this.addComponent(this.componentData.fields);
				}
			},
			error: (err: any) => {
				if (err.error) {
					this.toastr.error(`${ err.error.message }`, `${ err.status } ${ err.statusText }`);
				}
			},
			complete: () => {
				// console.log("completed");
			},
		});
	}

	getFormValuesFromBuilder (event: any) {

		this.valueSubmitting = true;
		let dataObject = event.data;
		const formData = new FormData();
		// Loop through the properties of the dataObject and append them to FormData
		for (const key in dataObject) {
			if (dataObject.hasOwnProperty(key)) {
				formData.append(key, dataObject[key]);
			}
		}
		if (this.channelData.length > 0) {
			formData.append('channelDetails', JSON.stringify(this.channelData));
		} else {
			formData.append('channelDetails', JSON.stringify([]));
		}

		if (this.formActivity == "add") {
			this.genericHttp.storeFormData(formData, event['storeUrl']).subscribe({
				next: (response: any) => {
					if (response.status == 200 && response.success) {
						this.toastr.success(`Data Created Successfully`, `Success`);
						this.router.navigate(["/alert/alert/list"]);
					} else {
						alert('Error');
						this.valueSubmitting = false;
					}
				},
				error: (err: any) => {
					if (err.error.status) {
						this.formErrorData = err.error.data.formData.errors;
						this.formErrorReturn(this.formErrorData);
						this.changeDetectorRef.detectChanges();
					}
					this.valueSubmitting = false;
				},
				complete: () => {
					// console.log("completed");
				},
			});
		} else {
			this.genericHttp.editFormData(formData, event['storeUrl']).subscribe({
				next: (response: any) => {
					if (response.status == 200 && response.success) {
						this.toastr.success(`Data Updated Successfully`, `Success`);
						this.router.navigate(["/alert/alert/list"], {queryParams: this.backUrlParams});
					} else {
						alert('Error');
						this.valueSubmitting = false;
					}
				},
				error: (err: any) => {
					if (err.error.status) {
						this.formErrorData = err.error.data.formData.errors;
						this.formErrorReturn(this.formErrorData);
						this.changeDetectorRef.detectChanges();
					}
					this.valueSubmitting = false;
				},
				complete: () => {
					// console.log("completed");
				},
			});
		}
	}

	formErrorReturn (errorData: any) {
		let data = errorData;
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
	saveForm () {
		this.dynamicFormSubmitHandler = true;
		if (this.dynamicForm.invalid) {
			console.warn("Error=> ", this.dynamicForm.value);
			return;
		} else {

			if (this.channelData.length > 0) {
				this.channelData = this.channelData || [];
				this.channelData.forEach((item, idx) => {
					if (typeof item.template_text === "string" && item.template_text.length === 0) {
						console.log("The string is empty");
						delete this.channelData[idx].template_text;
					} else if (item.template_text === null) {
						console.log("The string is null");
						delete this.channelData[idx].template_text;
					} else {
					}
				});

				if (this.checkIfChannelDataHasCheckedIdsAndContent()) {
					const missingData = this.editorDetails.filter((editor) =>
						!this.channelData.some(channel =>
							channel.channel_id === editor.value &&
							channel.hasOwnProperty('template_text')
						)
					);
					// const missingLabels = missingData.map(item => item.label).join(', ');
					// this.toastr.warning(`Please Add ${ missingLabels } Template Data`, 'Warning');

					console.log(missingData);

					if (missingData.length > 0) {
						const labels = missingData.map(item => item.label);
						const message = labels.length > 1
							? `Please Add ${ labels.slice(0, -1).join(', ') } and ${ labels.slice(-1) } Template Data`
							: `Please Add ${ labels[0] } Template Data`;

						this.toastr.warning(message, 'Warning');
					}
				} else {
					this.getFormValuesFromBuilder(
						{
							form: "single",
							storeUrl: this.componentData.formStoreUrl,
							data: this.dynamicForm.value,
						}
					);
				}
			} else {
				this.toastr.warning(`Please Add Template Data`, `Warning`);
			}
		}
	}

	checkIfChannelDataHasCheckedIdsAndContent () {

		let hasUnmatchedValue = false;

		this.editorDetails.forEach(editor => {
			const exists = this.channelData.some(channel =>
				channel.channel_id === editor.value && channel.hasOwnProperty('template_text')
			);
			if (!exists) {
				hasUnmatchedValue = true;
			}
		});

		return hasUnmatchedValue;
	}

	addComponent (controls: FormFieldJSON[]): void {
		// console.log(controls[1].type == 'mobileNo');


		for (let control of controls) {
			const validators = [];
			if (control.validators?.required) {
				validators.push(Validators.required);
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
			if (control.name == 'channels') {
				this.channelData = this.componentData.channelDetails;
				if (control.value) {
					this.onCheckboxUpdate({
						"controlName": "channels",
						"data": control.value
					});
				}
			}
			// End
		}

	}
	async onCheckboxUpdate (selectedValues: any) {
		if (this.dynamicForm.get(selectedValues.controlName)?.value == selectedValues.data) {
			this.dynamicForm.get(selectedValues.controlName)?.markAsDirty();
		}
		this.dynamicForm.patchValue({
			[selectedValues.controlName]: selectedValues.data,
		});
		this.editorDetails = [];
		this.editorDetails = this.checkboxOption[0].options.filter((item: {value: any;}) => selectedValues.data.includes(item.value));

		this.editorDetails.forEach((item: any) => {
			item.type = item.type == undefined ? this.fetchChannelType(item.value) : null;
		});

		this.channelData = this.channelData || [];
		this.channelData = this.channelData.filter((item: {channel_id: any;}) => selectedValues.data.includes(item.channel_id));

		// Map over editorDetails and update each with template_text and type
		this.editorDetails = await Promise.all(this.editorDetails.map(async (editorItem) => {
			const matchingChannel = this.channelData.find(
				(channelItem) => channelItem.channel_id === editorItem.value
			);

			const template_text = matchingChannel ? matchingChannel.template_text : '';

			// Fetch the type asynchronously
			const type = await this.fetchChannelType(editorItem.value);
			// console.log(type);


			return {...editorItem, template_text, type};
		}));

		// console.log('editorDetails =>', this.editorDetails);
	}


	// Method to fetch 'type' from the API and add it to the editor item
	fetchChannelType (value: any) {
		return new Promise((resolve) => {
			this.genericHttp.searchData(`alert/channel/get-detail-by-id/${ value }`).subscribe(
				// this.genericHttp.getDummyDList(`assets/jsons/channel-details.json`).subscribe(
				(response) => {
					if (response.status == 200 || response.success) {
						// Access the 'type' property from response.data
						const type = response.data?.type;
						resolve(type);
					} else {
						this.toastr.error(`${ response.message }`, `${ response.error_code }`);
						resolve(null);
					}
				},
				(err) => {
					this.toastr.error(`${ err.message }`, `${ err.status }`);
					resolve(null);
				}
			);
		});
	}
	getEditorData (event: any) {
		// Ensure channelData is an array
		this.channelData = this.channelData || [];

		// Find the index of the existing object with the same channel_id
		const existingIndex = this.channelData.findIndex(
			(item) => item.channel_id === event.channel_id
		);

		if (existingIndex !== -1) {
			// Update the existing object if found
			if (typeof event.template_text === "string" && event.template_text.length === 0) {
				// console.log("The string is empty");
				delete this.channelData[existingIndex].template_text;
			} else if (event.template_text === null) {
				// console.log("The string is null");
				delete this.channelData[existingIndex].template_text;
			} else {
				this.channelData[existingIndex].template_text = event.template_text;
			}

		} else {
			// Add the whole object if it doesn't exist
			this.channelData.push(event);

		}

	}
}
