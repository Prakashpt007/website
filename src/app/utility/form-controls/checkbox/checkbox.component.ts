
import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	ChangeDetectorRef,
	SimpleChanges,
	inject,
} from "@angular/core";
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {GenericHttpService} from "../../../services/generic-http.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";

@Component({
	selector: "app-checkbox",
	templateUrl: "./checkbox.component.html",
	styleUrls: ["./checkbox.component.scss"],
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, CommonModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxComponent {
	formBuilder = inject(FormBuilder);
	dynamicCheckbox = this.formBuilder.group({});
	checkboxFields!: any;
	selectedValue: any[] = [];
	@Input() componentData: any;
	@Input() optionData: any;

	data: any;

	@Output() checkboxUpdate = new EventEmitter<any>();
	@Output() childOptionUpdateByParentId = new EventEmitter<any>();
	constructor (
		private cdRef: ChangeDetectorRef,
		private genericHttp: GenericHttpService
	) { }

	ngOnInit (): void {
		this.checkboxFields = this.componentData.options;
		this.selectedValue = this.componentData.value;


		if (this.componentData.name == 'activity_id') {
			this.getActivities();
		}
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes["optionData"].currentValue) {
			let data = changes["optionData"].currentValue;
			if (this.componentData.name == data.controlName) {
				this.data = [...data.data];
				this.componentData.options = [...data.data];
				this.checkboxFields = this.componentData.options;
			}
		}
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
		// console.log(this.selectedValue);
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
}
