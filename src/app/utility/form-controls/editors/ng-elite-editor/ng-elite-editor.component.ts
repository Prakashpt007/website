import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, SecurityContext, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AngularEditorComponent, AngularEditorConfig} from '@josipv/angular-editor-k2';
import {AngularEditorModule} from '@josipv/angular-editor-k2';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {DataComponent} from '../data/data.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
	selector: 'app-ng-elite-editor',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, CommonModule, AngularEditorModule, DataComponent, MatFormFieldModule],
	templateUrl: './ng-elite-editor.component.html',
	styleUrl: './ng-elite-editor.component.scss'
})
export class NgEliteEditorComponent {
	@ViewChild('angularEditor') angularEditor!: AngularEditorComponent;
	@Input() channelId!: any;
	@Input() channelName!: any;
	@Input() componentFormData!: any;
	@Input() componentData!: any;

	@Output() editorContent = new EventEmitter<any>();

	public editorData: string = '';
	variableList: any[] = [];
	updatedVariableList: any[] = [];
	variableListApiUrl: string = 'alert/variable/get-list';
	editorPreview: SafeHtml = '';

	searchVariable: string = '';

	testForm!: FormGroup;
	testFormSubmitHandler = false;
	testApiUrl: string = "alert/test";

	editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '150px',
		maxHeight: 'auto',
		width: 'auto',
		minWidth: '0',
		translate: 'no',
		enableToolbar: true,
		showToolbar: true,
		placeholder: 'Enter text here...',
		defaultParagraphSeparator: '',
		defaultFontName: '',
		defaultFontSize: '',
		fonts: [
			{class: 'arial', name: 'Arial'},
			{class: 'times-new-roman', name: 'Times New Roman'},
			{class: 'calibri', name: 'Calibri'},
			{class: 'comic-sans-ms', name: 'Comic Sans MS'},
			{class: 'monospace', name: 'Monospace'}
		],

		sanitize: false, // Disable sanitization
		toolbarPosition: 'top',
		toolbarHiddenButtons: [
			// ['bold', 'italic'],
			// ['fontSize']
		]
	};


	constructor (private sanitizer: DomSanitizer, private genericHttp: GenericHttpService, private changeDetectorRef: ChangeDetectorRef, public formBuilder: FormBuilder, private toastr: ToastrService) { }

	ngOnInit () {
		this.testForm = this.formBuilder.group({
			mobileNo: ["", [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10)]],
			email: ["", [Validators.email, Validators.minLength(6), Validators.maxLength(145)]],
		});

		if (this.componentData.value != undefined) {
			this.editorData = this.componentData.value;
		}

		this.getVariableList(this.variableListApiUrl);

	}


	getVariableList (url: string) {
		// this.genericHttp.getDummyDList('assets/jsons/email-variables.json').subscribe({
		this.genericHttp.searchData(url).subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.variableList = response.data;

					// Create a Set of IDs for quick lookup of existing items
					const existingIds = new Set(this.updatedVariableList.map(item => item.id));

					// Add only new items from variableList to updatedVariableList
					this.variableList.forEach((newItem: any) => {
						if (!existingIds.has(newItem.id)) {
							this.updatedVariableList.push(newItem);
							existingIds.add(newItem.id); // Update the Set with the new ID
						}
					});
				}
			},
			error: (err: any) => {
				if (err.error) {
					console.log(err);
					this.toastr.error(err.error, `Error`);
				}
			},
			complete: () => {
				// console.log("completed");
				this.editorPreview = this.sanitizer.bypassSecurityTrustHtml(this.replaceTags(this.editorData, this.updatedVariableList));
			},
		});
	}

	removeExtra (val: string) {
		return val.replace(/\$\$/g, "");
	}

	insertTag (tag: string): void {
		// Get the editor instance
		const editor = document.getElementsByClassName('angular-editor-textarea')[0] as HTMLElement;

		if (editor) {
			// Focus the editor
			editor.focus();

			// Insert the tag at cursor position
			const selection = window.getSelection();

			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const textNode = document.createTextNode(tag);

				range.deleteContents();
				range.insertNode(textNode);

				// Move cursor to end of inserted tag
				range.setStartAfter(textNode);
				range.setEndAfter(textNode);
				selection.removeAllRanges();
				selection.addRange(range);

				// Update model
				this.editorData = editor.innerHTML;
				this.onChange(this.editorData);
			}
		}
	}

	onChange (event: string) {


		this.editorData = event;
		this.editorContent.emit({
			controlName: this.componentData.name,
			data: event,
		});

		this.editorPreview = this.sanitizer.bypassSecurityTrustHtml(this.replaceTags(this.editorData, this.updatedVariableList));
	}

	replaceTags (text: string, updatedVariableList: {name: string; label: string; dummy_variable: string | null;}[]): string {
		updatedVariableList.forEach(item => {
			// Only replace if dummy_variable is not null
			if (item.dummy_variable !== null) {
				// Create a regex to match the {{name}} pattern, escaping special characters in item.name
				const regex = new RegExp(`{{\\s*${ item.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') }\\s*}}`, "g");
				text = text.replace(regex, item.dummy_variable);
			}
		});
		return text;
	}

	get f (): {[key: string]: AbstractControl;} {
		return this.testForm.controls;
	}

	submit () {
		this.testFormSubmitHandler = true;
		if (this.testForm.invalid) {
			return;
		} else {
			if (this.testForm.get('mobileNo')?.value != '' || this.testForm.get('email')?.value != '') {
				const formData = new FormData();
				formData.append('alertName', this.componentFormData.name == '' ? 'CropData Preview Testing' : this.componentFormData.name);
				formData.append('channelId', this.channelId);
				formData.append('channelName', this.channelName);
				formData.append('mobileNo', this.testForm.get('mobileNo')?.value);
				formData.append('email', this.testForm.get('email')?.value);
				const rawHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.editorPreview);
				const newRawHtml = rawHtml?.replace(/\\"/g, '"') || '';

				if (rawHtml?.length == 0) {
					this.toastr.warning(`Please Add Editor Content`, `Warning`);
				} else {
					formData.append('data', newRawHtml);
					this.genericHttp.storeFormData(formData, this.testApiUrl).subscribe({
						next: (response: any) => {
							if (response.status == 200) {
								this.toastr.success(`Test Send Successfully`, `Success`);
								this.testForm.reset();
								this.testFormSubmitHandler = false;
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

			} else {
				this.toastr.warning(`Please Enter Email / Mobile No.`, `Warning`);
			}
		}
	}
}
