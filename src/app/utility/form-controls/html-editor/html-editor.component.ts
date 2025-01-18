import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Editor, NgxEditorModule, Toolbar} from 'ngx-editor';

@Component({
	selector: 'app-html-editor',
	standalone: true,
	imports: [NgxEditorModule, CommonModule, ReactiveFormsModule, FormsModule],
	templateUrl: './html-editor.component.html',
	styleUrl: './html-editor.component.scss'
})
export class HtmlEditorComponent {
	@Input() componentData!: any;
	@Input() inputStatus!: boolean;
	@Output() editorContent = new EventEmitter<any>();
	@Output() editorInputStatusEvent = new EventEmitter<any>();
	editor!: Editor;
	html = '';
	toolbar: Toolbar = [
		// default value
		['bold', 'italic', 'underline', 'strike'],
		['code', 'blockquote'],
		['ordered_list', 'bullet_list'],
		[{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
		['link', 'image'],
		// or, set options for link:
		//[{ link: { showOpenInNewTab: false } }, 'image'],
		['text_color', 'background_color'],
		['align_left', 'align_center', 'align_right', 'align_justify'],
		['horizontal_rule', 'format_clear', 'indent', 'outdent'],
		['superscript', 'subscript'],
		['undo', 'redo'],
	];

	onChange (html: object) {
		if (this.html != this.componentData.value) {
			if (!this.inputStatus) {
				this.editorInputStatusEvent.emit({
					inputStatus: true
				});
			}
		}
		this.html = html.toString();

	}
	ngOnInit (): void {
		this.editor = new Editor();
		if (this.componentData.value != undefined) {
			this.html = this.componentData.value;
		}
	}

	// make sure to destory the editor
	ngOnDestroy (): void {
		this.editor.destroy();
	}

	sendData () {
		this.editorContent.emit({
			controlName: this.componentData.name,
			data: this.html,
		});

	}
}
