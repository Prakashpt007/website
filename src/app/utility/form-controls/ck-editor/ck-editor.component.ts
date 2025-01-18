import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, EventEmitter, Input, Output, SecurityContext, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ClassicEditor, Bold, Italic, Link, Heading, Paragraph, List, BlockQuote, Image, Table, MediaEmbed, UploadAdapter, SimpleUploadAdapter, SourceEditing, OutdentCodeBlockCommand, ImageResize, ImageStyle, ImageCaption, ImageToolbar, LinkImage, Alignment, RemoveFormat, Font, GeneralHtmlSupport, Code, Strikethrough, Subscript, Superscript, Underline, Base64UploadAdapter, ImageInsertViaUrl, AutoImage} from 'ckeditor5';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ChangeEvent, CKEditorComponent} from '@ckeditor/ckeditor5-angular/ckeditor.component';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../services/generic-http.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ClipboardModule} from '@angular/cdk/clipboard';

@Component({
	selector: 'app-ck-editor',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, CKEditorModule, MatFormFieldModule, ClipboardModule],
	templateUrl: './ck-editor.component.html',
	styleUrl: './ck-editor.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class CkEditorComponent {
	@ViewChild('editor') ckEditorInstance!: CKEditorComponent; // Add CKEditor instance reference
	@Input() componentData!: any;
	@Input() componentFormData!: any;
	@Input() channelId!: any;
	@Output() editorContent = new EventEmitter<any>();


	public newData: string = '';

	public editorData: string = '';
	editorPreview: SafeHtml = '';
	variableList: any[] = [];
	updatedVariableList: any[] = [];
	searchVariable: string = '';

	testForm!: FormGroup;
	testFormSubmitHandler = false;
	testApiUrl: string = "alert/test";

	variableListApiUrl: string = 'alert/variable/get-list';
	// variableListApiUrl: string = 'assets/jsons/email-variables.json';

	constructor (private sanitizer: DomSanitizer, private genericHttp: GenericHttpService, private changeDetectorRef: ChangeDetectorRef, public formBuilder: FormBuilder, public toastr: ToastrService) { }

	public Editor = ClassicEditor;


	public config = {
		fontFamily: {
			options: [
				'Arial',
				'Courier New',
				'Georgia',
				'Lucida Sans Unicode',
				'Tahoma',
				'Times New Roman',
				'Trebuchet MS',
				'Verdana'
			]
		},

		toolbar: {
			items: [
				'undo',
				'redo',
				'heading',
				'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
				'|',
				'bold',
				'italic',
				'|',
				'link',
				'alignment',
				'bulletedList',
				'numberedList',
				'|',
				'strikethrough',
				'code',
				'subscript',
				'superscript',
				'blockQuote',
				'|',
				'removeFormat',
				'|',
				'insertTable',
				'insertImage',
				'mediaEmbed',
				'sourceEditing',
			]
		},
		image: {
			toolbar: ['imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|', 'toggleImageCaption', 'imageTextAlternative']
		},
		plugins: [
			Bold,
			Italic,
			Link,
			Heading,
			Alignment,
			Paragraph,
			List,
			BlockQuote,
			Image,
			Table,
			MediaEmbed,
			SourceEditing,
			RemoveFormat,
			Font,
			Code,
			Strikethrough, Subscript, Superscript, Underline,
			Base64UploadAdapter,
			AutoImage, LinkImage, ImageInsertViaUrl
		],
		licenseKey: '<YOUR_LICENSE_KEY>',
		// mention: {
		//     Mention configuration
		// }
	};

	ngOnInit (): void {

		this.testForm = this.formBuilder.group({
			mobileNo: ["", [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10)]],
			email: ["", [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(145)]],
		});


		if (this.componentData.value != undefined) {
			this.editorData = this.componentData.value;
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
			const formData = new FormData();
			formData.append('alertName', this.componentFormData.name == '' ? 'CropData Preview Testing' : this.componentFormData.name);
			formData.append('channelId', this.channelId);
			formData.append('mobileNo', this.testForm.get('mobileNo')?.value);
			formData.append('email', this.testForm.get('email')?.value);
			const rawHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.editorPreview);
			const newRawHtml = rawHtml?.replace(/\\"/g, '"') || '';
			formData.append('data', newRawHtml);

			this.genericHttp.storeFormData(formData, this.testApiUrl).subscribe({
				next: (response: any) => {
					if (response.status == 200) {
						console.log(response.data);
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
	}
	onChange (event: any) {
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

	insertTag (tag: string): void {
		// const cursorPos = textArea.selectionStart;
		// const textBefore = this.editorData.substring(0, cursorPos);
		// const textAfter = this.editorData.substring(cursorPos, this.editorData.length);
		// this.editorData = textBefore + tag + textAfter + ' ';
		// // Move the cursor position after the inserted tag
		// setTimeout(() => {
		// 	textArea.selectionStart = textArea.selectionEnd = cursorPos + tag.length;
		// 	textArea.focus();
		// 	this.onChange(textArea.value);
		// }, 0);

		console.log('Before Edit = > ', this.editorData);

		this.editorData = this.editorData + tag;
		console.log('After Edit = > ', this.editorData);
		this.onChange(this.editorData);
	}

	//-------------------------------------------------------------------------------- //

	// insertTag (tag: string): void {
	// 	if (this.ckEditorInstance?.editorInstance) {
	// 		const editor = this.ckEditorInstance.editorInstance;

	// 		editor.model.change(writer => {
	// 			const selection = editor.model.document.selection;
	// 			let position = selection.getFirstPosition();

	// 			// Check if the position is within a valid context for inserting text
	// 			if (!position || !editor.model.schema.checkChild(position.parent as any, '$text')) {
	// 				const root = editor.model.document.getRoot();

	// 				// Check if the root is valid and insert at the beginning if necessary
	// 				if (root) {
	// 					position = writer.createPositionAt(root, 0); // Position at the beginning of root
	// 				} else {
	// 					console.error("Root element is not available.");
	// 					return;
	// 				}
	// 			}

	// 			// Insert the tag at the determined position
	// 			if (position) {
	// 				const textNode = writer.createText(tag);
	// 				editor.model.insertContent(textNode, position);

	// 				// Move the cursor to the end of the inserted text
	// 				writer.setSelection(writer.createPositionAfter(textNode));
	// 			}

	// 			// Trigger data update if needed
	// 			this.onChange(editor.getData());
	// 		});
	// 	} else {
	// 		console.error("CKEditor instance is not available.");
	// 	}
	// }


	//-------------------------------------------------------------------------------- //

	insertTagss (tag: string): void {
		if (this.ckEditorInstance?.editorInstance) {
			const editor = this.ckEditorInstance.editorInstance;
			editor.model.change(writer => {
				// Get the current selection or set to the beginning of the root if invalid
				let position = editor.model.document.selection.getFirstPosition();

				const root = editor.model.document.getRoot();
				if (!position || !editor.model.schema.checkChild(position.parent as any, '$text')) {
					if (root) {
						position = writer.createPositionAt(root, 0); // Safe fallback to the beginning of root
					} else {
						console.error("Root element is not available.");
						return;
					}
				}

				// Insert the tag text at the determined position
				if (position) {
					const textNode = writer.createText(tag);
					editor.model.insertContent(textNode, position);
					editor.model.insertContent(writer.createText(''), position);

					// Move the cursor to right after the inserted tag
					const endPosition = writer.createPositionAfter(textNode);
					writer.setSelection(endPosition);

					// Clear any selection range to prevent repeated insertions
					writer.setSelection(writer.createRange(endPosition, endPosition));
				}

				// Update editor data to reflect the change
				this.onChange(editor.getData());
			});

			// this.editorData = this.editorData + tag;
			this.changeDetectorRef.detectChanges();

		} else {
			console.error("CKEditor instance is not available.");
		}

	}


	insertTagNew (tag: string): void {
		if (this.ckEditorInstance?.editorInstance) {
			const editor = this.ckEditorInstance.editorInstance;

			editor.model.change(writer => {
				// Get the current selection or fallback to the start of the root element
				let position = editor.model.document.selection.getFirstPosition();
				const root = editor.model.document.getRoot();

				if (!position || !editor.model.schema.checkChild(position.parent as any, '$text')) {
					// If no valid position, set to start of the root element as fallback
					if (root) {
						position = writer.createPositionAt(root, 0); // Safe fallback to the beginning of root
					} else {
						console.error("Root element is not available.");
						return;
					}
				}

				// Insert the tag text at the resolved position
				const textNode = writer.createText(tag);
				editor.model.insertContent(textNode, position);

				// Move the cursor to after the inserted text without exceeding bounds
				const endPosition = writer.createPositionAfter(textNode);
				writer.setSelection(endPosition);

				// Trigger data update if needed
				this.onChange(editor.getData());
			});
		} else {
			console.error("CKEditor instance is not available.");
		}
	}



}
