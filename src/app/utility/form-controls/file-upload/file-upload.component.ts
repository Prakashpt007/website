import {CommonModule} from "@angular/common";
import {
	Component,
	Input,
	Output,
	ElementRef,
	ViewChild,
	EventEmitter,
	inject,
} from "@angular/core";
import {
	FormsModule,
	ReactiveFormsModule,
	FormBuilder,
	Validators,
} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ExtractFileExtensionPipe} from "../../pipes/extract-file-extension.pipe";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatError, MatLabel} from "@angular/material/form-field";

@Component({
	selector: "app-file-upload",
	templateUrl: "./file-upload.component.html",
	styleUrls: ["./file-upload.component.scss"],
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, CommonModule, ExtractFileExtensionPipe, MatError, MatLabel]
})
export class FileUploadComponent {
	@Input() componentData: any;
	@Input() errorClass: any;
	@Output() fileUpdate = new EventEmitter<any>();
	@ViewChild("thumbnailModal") thumbnailModal!: ElementRef;
	formBuilder = inject(FormBuilder);
	constructor (private modalService: NgbModal, private toastr: ToastrService) { }
	dynamicForm = this.formBuilder.group({});

	uploadFileName: string = "";
	uploadFileSize: string = "";
	uploadOriginalFileSize!: number;
	uploadBtnSts: boolean = true;
	dynamicFormSubmitHandler: boolean = false;
	selectedFile!: any;
	uploadedFile!: any;
	MIMEType: any = [];
	thumbnailModalSrc!: string;
	thumbnailModalName!: string | undefined;

	ngOnInit (): void {
		this.createComponent(this.componentData);
		this.selectedFile = this.componentData.value;
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
			this.formBuilder.control('', validators)
		);
		// let controlName = controls.name
		// this.dynamicForm.patchValue({
		//   controlName: this.componentData.value
		// })
	}

	fileUploadEvent (event: any): void {
		if (
			event.target.files[0] != null ||
			event.target.files[0] != undefined ||
			event.target.files[0] != ""
		) {
			if (this.checkType(event.target.files[0])) {
				const file: File = event.target.files[0];
				this.uploadFileName = file.name;
				this.uploadFileSize = this.convertToKBOrMB(file.size);
				this.uploadOriginalFileSize = file.size;
				this.uploadBtnSts = false;
				this.dynamicFormSubmitHandler = false;
				// Emmit Changes
				this.fileUpdate.emit({
					controlName: this.componentData.name,
					data: file,
				});
				this.selectedFile = null;
				// this.uploadedFile = null;



				const input = event.target as HTMLInputElement;
				if (input.files && input.files[0]) {
					const file = input.files[0];
					const reader = new FileReader();

					reader.onload = () => {
						const result = reader.result as string;
						if (result.includes('data:image')) {
							this.uploadedFile = result;
						}
					};

					reader.readAsDataURL(file);
				}
				// this.selectedFile = null;
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
		this.uploadFileName = "";
		this.uploadFileSize = "";
		this.uploadBtnSts = true;
		this.dynamicFormSubmitHandler = true;

		this.dynamicFormSubmitHandler = true;
		// Emmit Changes
		this.fileUpdate.emit({
			controlName: this.componentData.name,
			data: null,
		});

		// this.uploadedFile = undefined;
	}

	thumbnailViewEvent (thumbnailUrl: string, name?: string) {
		this.thumbnailModalSrc = thumbnailUrl;
		this.thumbnailModalName = name;
		this.modalService.open(this.thumbnailModal, {size: 'xl', scrollable: true, centered: true}).result.then(
			(result) => {
				// console.log(`Closed with: ${ result }`);
			},
			(reason) => {
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
			}
		);
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
}
