import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';

@Component({
	selector: 'app-approved-view-modal',
	templateUrl: './approved-view-modal.component.html',
	styleUrl: './approved-view-modal.component.scss',
	standalone: false
})
export class ApprovedViewModalComponent {
	@Input() requestId!: number;
	@Output() modalResponse = new EventEmitter<any>();

	thumbnailModalSrc!: string;
	thumbnailModalName!: string | undefined;

	@ViewChild("viewonlyModal") viewonlyModal!: ElementRef;
	@ViewChild("thumbnailModal") thumbnailModal!: ElementRef;

	pageId!: number;
	pageData!: any;

	constructor (
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private genericHttp: GenericHttpService,
		private modalService: NgbModal
	) {
	}

	ngOnInit (): void {
		this.pageId = Number(`${ this.requestId }`);
		if (this.pageId != undefined) {
			this.getData();
		}
	}


	getData () {
		this.genericHttp.getFormData(`warehouse/get-approved-list/${ this.pageId }/edit`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {
					this.pageData = response.data;
				} else {
					this.toastr.error("Details Not Found", `Failed`);
				}
			},
			error: (err: Error) => {
				// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
				this.toastr.error(err.message, `Error`);
				// this.router.navigate(["/dashboard"]);
				this.modalResponse.emit({
					status: 500,
					message: "Something Went Wrong"
				});
			},
			complete: () => {
				// console.log('completed');

			}
		});
	}

	thumbnailViewEvent (thumbnailUrl: string, name?: string) {
		this.thumbnailModalSrc = thumbnailUrl;
		this.thumbnailModalName = name;
		this.modalService.open(this.thumbnailModal, {size: 'xl', scrollable: true, centered: true}).result.then(
			(result) => {
				console.log(`Closed with: ${ result }`);
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
