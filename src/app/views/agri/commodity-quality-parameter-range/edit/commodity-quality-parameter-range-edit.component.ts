import {ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {ToastrService} from "ngx-toastr";
import {Observable, Subject} from "rxjs";
import {GenericHttpService} from "../../../../services/generic-http.service";
import {AppState} from "../../../../utility/store/store.reducer";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'app-commodity-quality-parameter-range-edit',
	templateUrl: './commodity-quality-parameter-range-edit.component.html',
	styleUrl: './commodity-quality-parameter-range-edit.component.scss',
	standalone: false
})
export class CommodityQualityParameterRangeEditComponent {
	@ViewChild("actionModal") actionModal!: ElementRef;

	form!: FormGroup;
	newDynamicForm!: FormGroup;
	formSubmitHandler = false;
	dynamicFormSubmitHandler = false;

	commodityList!: any[];
	varietyList!: any[];
	// params!: any;

	pageData!: any;
	bands: any[] = [];
	parameterData!: any;

	newFormShow: boolean = false;
	generateFormBtnSts: boolean = false;

	backUrlParams!: any;
	generateDynamicFormBtn: boolean = false;
	paramsOptionData: any[] = [];
	params: any = [
		{
			"name": "parameters",
			"label": "Parameters",
			"validators": {
				"required": true,
			},
			"options": [],
			"value": []
		}
	];


	paramsArr!: Array<any>;

	formActivity: string = "";
	pageId!: any;
	constructor (
		private store: Store<AppState>,
		private genericHttp: GenericHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		public formBuilder: FormBuilder,
		private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef
	) {

		this.form = this.formBuilder.group({
			commodityId: ["", Validators.required],
			varietyId: ["", Validators.required],
			parameters: [[], Validators.required],
		});
	}

	ngOnInit () {

		if (this.route.snapshot.paramMap.get("id") != null) {
			this.pageId = Number(`${ this.route.snapshot.paramMap.get("id") }`);
			this.getData(this.pageId);
		}
		// Get backurl params from store and set value to backurl with params
		this.store.select('store').subscribe({
			next: (response) => {
				this.backUrlParams = response.backUrl;
			}
		});
	}

	getData (pageId: string) {

		this.genericHttp.getPageDetailsByPageId(`agri/parameter-ranges/edit/${ pageId }`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {
					this.pageData = response.data;

					this.getCommodity().subscribe({
						next: (response: any[]) => {
							this.commodityList = response;
						},
						error: (err: any) => {
							this.toastr.error(err.error.message, `Error`);
						},
						complete: () => {
							this.getVariety(this.pageData.commodityId).subscribe({
								next: (response: any[]) => {
									this.varietyList = response;
								},
								error: (err: any) => {
									this.toastr.error(err.error.message, `Error`);
								},
								complete: () => {
									this.form.patchValue({
										commodityId: this.pageData.commodityId,
										varietyId: this.pageData.varietyId,
									});


									this.form.get('commodityId')?.disable();
									this.form.get('varietyId')?.disable();

									this.params[0].value = [...this.pageData.parameterValues];
									this.pageData.parameters.forEach((item: any) => {

										this.params[0].options.push(item);
										this.paramsOptionData.push(item);

									});


									this.bands = this.pageData.bands;
									this.parameterData = this.pageData.parameterData;

									this.form.patchValue({
										'parameters': this.params[0].value
									});

									this.generateDynamicFormBtn = true;
									this.formSubmit();
								}
							});
						}
					});


				} else {
					this.toastr.error("Details Not Found", `Failed`);
				}
			},
			error: (err: Error) => {
				// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
				this.toastr.error(err.message, `Error`);
				// this.router.navigate(["/dashboard"]);
			},
			complete: () => {
				// console.log('completed');

			}
		});
	}


	get f (): {[key: string]: AbstractControl;} {
		return this.form.controls;
	}

	get dynamicF (): {[key: string]: AbstractControl;} {
		return this.newDynamicForm.controls;
	}

	formSubmit () {
		this.formSubmitHandler = true;
		if (this.form.invalid) {
			return;
		} else {
			this.paramsArr = this.filterByValues(this.form.get('parameters')?.value, this.params[0].options);

			this.generateDynamicForm(this.paramsArr);
		}
	}

	getCommodity () {
		const commoditiesSubject: Subject<any> = new Subject<any>();
		const commodities$: Observable<any> = commoditiesSubject.asObservable();

		this.genericHttp.getCommodityDList().subscribe({
			next: (response) => {
				commoditiesSubject.next(response.data);
				commoditiesSubject.complete();
				this.resetParams();
			},
			error: (err: any) => {
				this.toastr.error(err.error.message, `Error`);
			},
			complete: () => {
				// console.log('completed');
			}
		});
		return commodities$;
	}

	getVariety (commodityId: any) {
		const varietiesSubject: Subject<any> = new Subject<any>();
		const varieties$: Observable<any> = varietiesSubject.asObservable();
		this.generateDynamicFormBtn = false;
		this.resetParams();

		this.genericHttp.getParentVarietyDList(commodityId).subscribe({
			next: (response) => {
				varietiesSubject.next(response.data);
				varietiesSubject.complete();
			},
			error: (err: any) => {
				this.toastr.error(err.error.message, `Error`);
			},
			complete: () => {
				// console.log('completed');
			}
		});
		return varieties$;
	}


	resetParams () {
		this.form.patchValue({
			'parameters': []
		});
		this.params[0].options = [];
		this.params[0].value = [];
		this.newFormShow = false;
		this.newDynamicForm = this.formBuilder.group({});
	}

	resetDynamicForm () {
		this.newFormShow = false;
		this.newDynamicForm = this.formBuilder.group({});
		this.dynamicFormSubmitHandler = false;
	}

	generateDynamicForm (params: Array<any>) {
		this.newDynamicForm = this.formBuilder.group({});
		this.newFormShow = true;
		// console.log(this.pageData.bands);
		// console.log(params);

		this.generateFormBtnSts = false;


		params.forEach(param => {
			const paramGroup = this.formBuilder.group({});
			this.bands.forEach((band: any) => {
				const bandGroup = this.formBuilder.group({
					min: new FormControl('', [Validators.required]),
					max: new FormControl('', [Validators.required])
				});
				paramGroup?.addControl(band.value.toString(), bandGroup);
			});
			this.newDynamicForm?.addControl(param.value.toString(), paramGroup);
		});

		this.addValuesToForm();
	}

	addValuesToForm () {
		Object.keys(this.parameterData).forEach(paramKey => {
			const paramGroup = this.newDynamicForm.get(paramKey) as FormGroup;
			if (paramGroup) {
				Object.keys(this.parameterData[paramKey]).forEach(bandKey => {
					const bandGroup = paramGroup.get(bandKey) as FormGroup;
					if (bandGroup) {
						const bandData = this.parameterData[paramKey][bandKey];
						bandGroup.patchValue({
							min: bandData.min,
							max: bandData.max
						});
					}
				});
			}
		});
	}

	filterByValues (values: number[], data: any[]): any[] {
		return data.flatMap(item => item.options).filter(option => values.includes(option.value));
	}

	dynamicFormSubmit () {
		let dd = JSON.stringify(this.newDynamicForm?.value);
		console.log(JSON.parse(dd));


		this.dynamicFormSubmitHandler = true;
		if (this.newDynamicForm.invalid) {
			return;
		} else {

			console.log(this.newDynamicForm?.value);
			console.log(JSON.stringify(this.newDynamicForm?.value));

			let dd = JSON.stringify(this.newDynamicForm?.value);
			console.log(JSON.parse(dd));


			const formData = new FormData();
			formData.append('commodityId', this.form.get('commodityId')?.value);
			formData.append('varietyId', this.form.get('varietyId')?.value);
			formData.append('parameters', JSON.stringify(this.newDynamicForm?.value));

			this.genericHttp.storeFormData(formData, `agri/parameter-ranges/save`).subscribe({
				next: (response: any) => {
					if (response.status == 200 || response.success == true) {
						this.toastr.success(`Data Updated Successfully`, `Success`);
						this.router.navigate(["agri/quality-parameter-range/list"], {queryParams: this.backUrlParams});
					} else {
						alert('Error');
					}
				},

				error: (err: any) => {
					this.changeDetectorRef.detectChanges();
					this.toastr.error(err.error.message, `Error`);

				},
				complete: () => {
					// console.log('completed');
				}
			});
		}

	}

	checking (val: any) {
		if (val > 0) {
			return false;
		} else {
			return true;
		}

	}

	selectionChange (event: any) {
		console.log(event);

	}

	onCheckboxUpdate (selectedValues: any) {

		this.form.patchValue({
			'parameters': selectedValues.data
		});
		this.changeDetectorRef.detectChanges();
		this.form.markAsDirty();
		console.log(this.form.get('parameters')?.value);

		if (this.form.get('parameters')?.value.length == 0) {
			this.resetDynamicForm();
		}

		this.generateFormBtnSts = true;
		// this.formSubmit();
		this.resetDynamicForm();
	}

	getChildDlOptionsByParentId (event: any) {
		console.log(event);

		// this.componentOptionDataFromParent = event;
		this.changeDetectorRef.detectChanges();
	}

	removeRecord (parameterId: number) {
		// console.log(parameterId);

		this.modalService.open(this.actionModal, {scrollable: true, centered: true}).result.then(
			(result) => {
				console.log(`Closed with: ${ result }`);

				if (this.pageData.parameterValues.includes(parameterId)) {
					// Delete record from Database
					this.genericHttp.deleteAction(`agri/quality-parameter-range/${ parameterId }`).subscribe({
						next: (response: any) => {
							if (response.status == 200 && response.success) {
								this.toastr.success(`Record Deleted Successfully`, `Success`);
							} else {
								this.toastr.error(`Please contact administrator for more information`, `Error`);
							}
							this.getData(this.pageId);
						},
						error: (err: any) => {
							this.toastr.error(`Please contact administrator for more information`, `Error`);
						},
						complete () {

						}

					});

				} else {
					// Delete record from table
					this.paramsArr = this.paramsArr.filter(item => item.value != parameterId);
					let dd: any[] = [];
					this.form.get('parameters')?.value.filter((item: any) => {
						if (item != parameterId) {
							dd.push(item);
						}

					});
					this.form.patchValue({
						'parameters': dd
					});
					this.params[0].value = dd;

					this.removeFormGroupFromDynamicForm(parameterId);

					this.changeDetectorRef.detectChanges();
				}

			},
			(reason) => {
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
			}
		);

	}

	removeFormGroupFromDynamicForm (paramKey: any) {
		if (this.newDynamicForm.contains(paramKey)) {
			this.newDynamicForm.removeControl(paramKey);
		}
		console.log("paramKey = > ", paramKey);

	}

	private getDismissReason (reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return "by pressing ESC";
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return "by clicking on a backdrop";
		} else {
			return `with: ${ reason }`;
		}
	}
};



