import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../services/generic-http.service';
import {CommonModule} from '@angular/common';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {trigger, transition, style, animate} from '@angular/animations';
import {FormatTextPipe} from '../pipes/format-text.pipe';

@Component({
	selector: 'app-fls-doc-approve-reject-modal',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, FormatTextPipe],
	templateUrl: './fls-doc-approve-reject-modal.component.html',
	styleUrl: './fls-doc-approve-reject-modal.component.scss',
	animations: [
		trigger("fade", [
			transition("void => *", [
				style({opacity: 0}),
				animate(300, style({opacity: 1})),
			]),
		]),
	],
})
export class FlsDocApproveRejectModalComponent {
	@ViewChild("rejectDocModal") rejectDocModal!: ElementRef;
	@ViewChild("approveDocModal") approveDocModal!: ElementRef;
	@ViewChild("thumbnailModal") thumbnailModal!: ElementRef;

	@Input() docsData!: any;
	@Input() requestUrl!: any;
	@Output() docRejected = new EventEmitter<any>();
	@Output() docApproved = new EventEmitter<any>();

	thumbnailModalSrc!: string;
	thumbnailModalName!: string | undefined;

	rejectionForm!: FormGroup;

	rejectionReason!: any[];
	rejectionReasonList!: any[];
	docs: Array<any> = [];
	requestID!: number;

	constructor (
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private changeDetectorRef: ChangeDetectorRef,
		private genericHttp: GenericHttpService,
		private modalService: NgbModal,
		private renderer: Renderer2,
		private elRef: ElementRef
	) {

		this.rejectionForm = this.formBuilder.group({});
	}

	ngOnInit (): void {
		this.getRejectionReasonDList(1);
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
		const dockArray = data.tabs.flatMap(
			(item: {placeholders: any[];}) =>
				item.placeholders.map(
					(file: {docId: any; rejectionReasonId: any; status: any;}) => ({
						docId: file.docId,
						rejectionReasonId: file.rejectionReasonId,
						status: file.status,
					})
				)
		);

		dockArray.forEach((item: any) => {
			if (item.docId != null || item.docId != undefined) {
				var controlName = item.docId.toString();
				var control = new FormControl(
					item.rejectionReasonId == null ? '' : item.rejectionReasonId,
					Validators.required
				);
				this.rejectionForm.addControl(controlName, control);
				item.rejectionReasonId != null ? this.rejectionForm.get(controlName)?.disable() : null;
			} else {

			}
		});

		this.docs = data.tabs;
		this.docs = this.docs.map((obj, index) => {
			return {
				...obj,
				status: index === 0 ? true : false,
			};
		});
	}

	getRejectionReasonDList (typeId: number) {
		this.genericHttp.getRejectionReasonDList(typeId).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.rejectionReasonList = response.data;
				} else {
					this.rejectionReasonList = [];
					this.toastr.error(`${ response.message }`, `${ 'Error' }`);
				}

			},
			error: (err: Error) => {
				// console.log(err);
				// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
			},
			complete: () => {
				// console.log('completed');
			}
		});
	}


	rejectDoc (docId: number) {
		this.modalService.open(this.rejectDocModal, {backdrop: 'static', keyboard: true, scrollable: true, centered: true}).result.then(
			(result) => {
				if (docId != null) {
					let docRejectUrl = `${ this.requestUrl }/reject-document`;
					let data = {
						docId: docId,
						rejectionReasonId: Number(this.rejectionForm.controls[docId].value),
					};

					this.genericHttp.rejectDoc(docRejectUrl, data).subscribe({
						next: (response: any) => {
							if (response.status == 200 && response.success) {
								this.docRejected.emit(true);
								// this.router.navigate(["/finance-qa/company/list"]);
							} else {
								this.docRejected.emit(false);
								this.toastr.error(response.message, "Error");
							}

						},
						error: (err: Error) => {
							console.log(err);
							this.docRejected.emit(false);
						},
						complete: () => {
							// console.log('completed');
						}
					});
				}


				//------------------------------- Reject Doc API Call Here -------------------------------//
			},
			(reason) => {
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
				//------------------------------- Reject Doc Cancel Here -------------------------------//
			}
		);
	}

	approveDoc (docId: number) {
		this.modalService.open(this.approveDocModal, {backdrop: 'static', keyboard: true, scrollable: true, centered: true}).result.then(
			(result) => {
				if (docId != null) {
					let docApprovedUrl = `${ this.requestUrl }/approve-document`;
					let data = {
						docId: docId
					};

					this.genericHttp.approvedDoc(docApprovedUrl, data).subscribe({
						next: (response: any) => {
							if (response.status == 200 && response.success) {
								this.docApproved.emit(true);
								// this.getData(this.pageId);
							} else {
								this.docApproved.emit(false);
								this.toastr.error(response.message, "Error");
							}

						},
						error: (err: Error) => {
							console.log(err);
							this.docApproved.emit(false);
						},
						complete: () => {
							// console.log('completed');
						}
					});
				}


				//------------------------------- Approved Doc API Call Here -------------------------------//
			},
			(reason) => {
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
				//------------------------------- Approved Doc Cancel Here -------------------------------//
			}
		);
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

	// activeLink = 'home';

	// ngAfterViewInit () {
	// 	// Set initial position of the underline
	// 	const activeElement = this.elRef.nativeElement.querySelector('.nav-link.active');
	// 	if (activeElement) {
	// 		this.updateUnderline(activeElement);
	// 	}
	// }

	// setActiveLink (link: string, event: MouseEvent) {
	// 	event.preventDefault();
	// 	this.activeLink = link;
	// 	const target = event.target as HTMLElement;
	// 	this.updateUnderline(target);
	// }

	// updateUnderline (target: HTMLElement) {
	// 	const navMenu = this.elRef.nativeElement.querySelector('.nav-menu') as HTMLElement;
	// 	const underline = this.elRef.nativeElement.querySelector('.underline') as HTMLElement;
	// 	if (navMenu && underline) {
	// 		const targetRect = target.getBoundingClientRect();
	// 		const menuRect = navMenu.getBoundingClientRect();

	// 		// Update the width and left position of the underline
	// 		this.renderer.setStyle(underline, 'width', `${ targetRect.width }px`);
	// 		this.renderer.setStyle(underline, 'left', `${ targetRect.left - menuRect.left }px`);
	// 	}
	// }

}
