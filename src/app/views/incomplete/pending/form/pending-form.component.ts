import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {trigger, transition, style, animate} from '@angular/animations';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-pending-form',
	templateUrl: './pending-form.component.html',
	styleUrl: './pending-form.component.scss',
	standalone: false,
	animations: [
		trigger("fade", [
			transition("void => *", [
				style({opacity: 0}),
				animate(300, style({opacity: 1})),
			]),
		]),
	],
})
export class PendingFormComponent {

	@ViewChild("sendVideoModal") sendVideoModal!: ElementRef;
	modalConfirmationMessage!: string;
	pageId!: any;
	allData!: any;
	backUrlParams!: any;


	constructor (
		private store: Store<AppState>,
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private genericHttp: GenericHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private modalService: NgbModal,
	) {


	}

	ngOnInit (): void {

		if (this.route.snapshot.paramMap.get("id") != null) {
			this.pageId = Number(`${ this.route.snapshot.paramMap.get("id") }`);
			this.getData(this.pageId);
		}

		// Get backurl params from store and set value to backurl with params
		this.store.select('store').subscribe({
			next: (response) => {
				this.backUrlParams = response.backUrl;
			}
		});

	}
	sendVideo (id: any, link: string, label: string) {
		this.modalConfirmationMessage = `<p class="m-0"><strong><i class='fa-brands fa-youtube text-danger me-1'></i> ${ label }</strong></p>`;
		this.modalService.open(this.sendVideoModal, {scrollable: true}).result.then(
			(result) => {
				if (result == 'send') {
					// Send Video Here
				}
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

	getData (pageId: number) {
		this.genericHttp.getFormData(`incomplete-cases/${ pageId }/get-details`).subscribe({
			next: (response: any) => {
				if (response.status == 200 || response.success == true) {

					this.allData = response.data;

					const nextStep = this.allData.nextStep;
					let foundMatch = false;

					// Iterate through sections and screens using map()
					this.allData.sections.map((section: {screens: any[];}) => {
						section.screens.map((screen: {name: any; icon: string; match: string;}) => {
							if (!foundMatch) {
								if (nextStep !== screen.name) {
									screen.icon = 'done';
									screen.match = 'stage-completed';
								} else if (nextStep === screen.name) {
									screen.icon = 'pending';
									screen.match = 'stage-pending';
									foundMatch = true;
								}
							} else {
								screen.icon = 'na';
								screen.match = 'stage-notApplicable';
							}
							return screen;
						});
						return section;
					});

				} else {
					this.toastr.error("Details Not Found", `Failed`);
				}
			},
			error: (err: Error) => {
				// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
				this.toastr.error(err.message, `Error`);
				this.router.navigate(["/dashboard"]);
			},
			complete: () => {
				// console.log('completed');

			}
		});
	}

}
