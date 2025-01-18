import {CommonModule} from "@angular/common";
import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {
	FormsModule,
	ReactiveFormsModule,
	FormBuilder,
	Validators,
} from "@angular/forms";
import {MatError, MatLabel} from "@angular/material/form-field";
import {ToastrService} from "ngx-toastr";

@Component({
	selector: "app-multiple-file-upload",
	templateUrl: "./multiple-file-upload.component.html",
	styleUrls: ["./multiple-file-upload.component.scss"],
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, CommonModule, MatLabel, MatError],
})
export class MultipleFileUploadComponent {
	@Input() componentData: any;
	@Input() errorClass: any;
	@Output() fileUpdate = new EventEmitter<any>();
	formBuilder = inject(FormBuilder);
	constructor (private toastr: ToastrService) { }
	dynamicForm = this.formBuilder.group({});

	uploadFileName: string = "";
	uploadFileSize: string = "";
	uploadBtnSts: boolean = true;
	dynamicFormSubmitHandler: boolean = false;
	MIMEType: any = [];
	fileList: Array<any> = [];

	ngOnInit (): void {
		this.createComponent(this.componentData);
	}

	createComponent (controls: any): void {
		const validators = [];

		if (controls.validators?.required) {
			validators.push(Validators.required);
		}

		if (controls.validators?.MIMEType) {
			this.MIMEType = controls.validators?.MIMEType;
		}

		this.dynamicForm.addControl(
			controls.name,
			this.formBuilder.control("", validators)
		);
	}

	fileUploadEvent (event: any): void {
		const files = event.target.files;

		for (let i = 0; i < files.length; i++) {
			console.log(files[i].type == "image/jpeg");

			if (files[i].type == "image/jpeg") {
				this.fileList.push(files[i]);
			}
		}
	}

	fileUploadEvents (event: any): void {
		const files = event.target.files;

		for (let i = 0; i < files.length; i++) {
			if (files[i] != null || files[i] != undefined || files[i] != "") {
				if (this.checkType(files[i])) {
					this.fileList.push(files[i]);
					// Emmit Changes
					this.uploadBtnSts = false;
					// this.uploadOriginalFileSize = files[i].size;
					this.fileUpdate.emit({
						controlName: this.componentData.name,
						data: files,
					});
				} else {
					this.toastr.error(
						`Please Choose These formats ${ this.MIMEType }`,
						"File Not Supported"
					);
					this.cancelEvent();
				}
				// End
			}
		}
	}

	checkType (file: File): boolean {
		var blob = file;
		return this.MIMEType.includes(blob.type);
	}

	dynamicClass (size: number): string {
		const percentage = Number(
			(
				(size / this.componentData.validators?.maxFileSize / 1024) *
				100
			).toFixed(4)
		);

		let classname = "";

		if (percentage > 20) {
			classname = "text-bg-success";
		}

		if (percentage > 30) {
			classname = "text-bg-success";
		}
		if (percentage > 40) {
			classname = "text-bg-info";
		}

		if (percentage > 80) {
			classname = "text-bg-warning";
		}

		return classname;
	}

	convertToKBOrMB (inputNumber: number): string {
		if (inputNumber >= 1024 * 1024) {
			return (inputNumber / (1024 * 1024)).toFixed(2) + " MB";
		} else {
			return (inputNumber / 1024).toFixed(2) + " KB";
		}
	}

	cancelEvent () {
		this.dynamicForm.reset();
		this.fileList = [];
		this.uploadBtnSts = true;
		this.dynamicFormSubmitHandler = true;

		this.dynamicFormSubmitHandler = true;
		// Emmit Changes
		this.fileUpdate.emit({
			controlName: this.componentData.name,
			data: null,
		});
	}
}
