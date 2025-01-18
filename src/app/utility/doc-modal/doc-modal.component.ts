import {ChangeDetectorRef, Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {trigger, transition, style, animate} from '@angular/animations';

@Component({
	selector: 'app-doc-modal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './doc-modal.component.html',
	styleUrl: './doc-modal.component.scss',
	animations: [
		trigger("fade", [
			transition("void => *", [
				style({opacity: 0}),
				animate(300, style({opacity: 1})),
			]),
		]),
	],
})
export class DocModalComponent {
	@ViewChild("thumbnailModal") thumbnailModal!: ElementRef;

	@Input() docsData!: any;

	thumbnailModalSrc!: string;
	thumbnailModalName!: string | undefined;

	docs: Array<any> = [];


	constructor (
		private changeDetectorRef: ChangeDetectorRef,
		private modalService: NgbModal,
	) {
	}

	ngOnInit (): void {
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes["docsData"]) {
			let data = changes["docsData"].currentValue;
			this.generateForm(data);
		}
	}

	toggleTabs (tabName: string) {
		// console.log(tabName);

		this.docs.forEach((obj, index) => {
			obj.status = `tab_${ index + 1 }` === tabName;
		});
		this.changeDetectorRef.detectChanges();
	}

	generateForm (data: any) {
		data.tabs.flatMap(
			(item: {placeholders: any[];}) =>
				item.placeholders.map(
					(file: {docId: any; rejectionReasonId: any; status: any;}) => ({
						docId: file.docId,
						rejectionReasonId: file.rejectionReasonId,
						status: file.status,
					})
				)
		);

		this.docs = data.tabs;
		this.docs = this.docs.map((obj, index) => {
			return {
				...obj,
				status: index === 0 ? true : false,
			};
		});
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
