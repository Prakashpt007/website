import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, EventEmitter, Input, Output, SecurityContext} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
import {MatFormFieldModule} from '@angular/material/form-field';
import {GenericHttpService} from '../../../services/generic-http.service';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
@Component({
	selector: 'app-text-editor',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, AutosizeModule, MatFormFieldModule],
	templateUrl: './text-editor.component.html',
	styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {
	@Input() channelId!: any;
	@Input() channelName!: any;
	@Input() componentFormData!: any;
	@Input() editorId!: any;
	@Input() editorValue!: any;
	@Output() editorContent = new EventEmitter<any>();

	variableList: any[] = [];
	updatedVariableList: any[] = [];
	searchVariable: string = '';

	public editorData: string = '';
	editorPreview: SafeHtml = '';
	testForm!: FormGroup;
	testFormSubmitHandler = false;
	testApiUrl: string = "alert/test";

	variableListApiUrl: string = 'alert/variable/get-list';
	constructor (private sanitizer: DomSanitizer, private genericHttp: GenericHttpService, private changeDetectorRef: ChangeDetectorRef, public formBuilder: FormBuilder, private toastr: ToastrService) { }

	ngOnInit (): void {
		this.testForm = this.formBuilder.group({
			mobileNo: ["", [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10)]],
			email: ["", [Validators.email, Validators.minLength(6), Validators.maxLength(145)]],
		});

		if (this.editorValue != undefined) {
			this.editorData = this.editorValue;
			this.editorContent.emit({
				"channel_id": this.editorId,
				"template_text": this.editorData
			});
		}
		this.getVariableList(this.variableListApiUrl);

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

	onChange (event: any) {
		this.editorData = event;
		this.editorContent.emit({
			"channel_id": this.editorId,
			"template_text": this.editorData
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

	removeExtra (val: string) {
		return val.replace(/\$\$/g, "");
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

	insertTag (textArea: HTMLTextAreaElement, tag: string): void {
		const cursorPos = textArea.selectionStart;
		const textBefore = this.editorData.substring(0, cursorPos);
		const textAfter = this.editorData.substring(cursorPos, this.editorData.length);
		this.editorData = textBefore + tag + textAfter + ' ';
		// Move the cursor position after the inserted tag
		setTimeout(() => {
			textArea.selectionStart = textArea.selectionEnd = cursorPos + tag.length;
			textArea.focus();
			this.onChange(textArea.value);
		}, 0);
	}
}