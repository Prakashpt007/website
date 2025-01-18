import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../../services/generic-http.service';
import {AppState} from '../../../../utility/store/store.reducer';
import {animate, style, transition, trigger} from '@angular/animations';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-warehouse-company-form',
	templateUrl: './warehouse-company-form.component.html',
	styleUrl: './warehouse-company-form.component.scss',
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
export class WarehouseCompanyFormComponent {
	@ViewChild("confirmationModal") confirmationModal!: ElementRef;

	form!: FormGroup;
	formSubmitHandler = false;
	slotDetails!: any;
	flsList!: any[];
	availableFlsList!: any;
	pageId!: number;
	backUrlParams!: any;
	formattedData!: any;

	updateSlotDetails: {
		flsName?: String,
		date?: Date,
		startTime?: String,
		endTime?: String,
	} = {
			flsName: "",
			date: new Date(),
			startTime: "",
			endTime: ""
		};

	constructor (
		private store: Store<AppState>,
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private changeDetectorRef: ChangeDetectorRef,
		private genericHttp: GenericHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private modalService: NgbModal
	) {
		// Form Build
		this.form = this.formBuilder.group({

		});
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

	get f (): {[key: string]: AbstractControl;} {
		return this.form.controls;
	}

	formSubmit () {
		this.formSubmitHandler = true;
		if (this.form.invalid) {
			return;
		} else {
			if (this.pageId != 0 || this.pageId != undefined) {

			} else {
				this.toastr.warning('Invalid Request ID', 'Warning');
			}
		}
	}
	slotConfirmation (flsName: string, date: Date, slotId: number, startTime: string, endTime: string) {
		this.updateSlotDetails = {};
		this.updateSlotDetails = {flsName: flsName, date: date, startTime: startTime, endTime: endTime};


		this.modalService.open(this.confirmationModal, {scrollable: true, centered: true, backdrop: "static"}).result.then(
			(result) => {
				console.log(`Closed with: ${ result }`);
				const updateURl = `case/${ this.pageId }/visit/${ this.slotDetails.caseVisitId }/scheduled-visit/rescheduling`;
				this.updateSlot(updateURl, slotId);

			},
			(reason) => {
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
			}
		);
	}

	getData (pageId: number) {

		this.genericHttp.getFormData(`${ pageId }/scheduled-visit/get-details`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {
					this.slotDetails = response.data.slotDetails;
					this.flsList = response.data.flsLists;

					// this.availableFlsList = this.flsList.reduce((acc, obj) => {
					// 	const dateObj = acc.find((item: {date: any;}) => item.date === obj.date) || {date: obj.date, data: []};
					// 	const flsUserObj = dateObj.data.find((item: {flsUserId: any;}) => item.flsUserId === obj.flsUserId) || {flsUserId: obj.flsUserId, flsName: obj.flsName, data: [], available: null, booked: null};

					// 	flsUserObj.data.push({
					// 		startTime: obj.startTime,
					// 		endTime: obj.endTime,
					// 		slotId: obj.slotId,
					// 		status: obj.status,
					// 	});

					// 	// Initialize the available and booked counts if they are null
					// 	if (flsUserObj.available === null) {
					// 		flsUserObj.available = 0;
					// 	}
					// 	if (flsUserObj.booked === null) {
					// 		flsUserObj.booked = 0;
					// 	}

					// 	// Update the available and booked counts
					// 	if (obj.status === "BOOKED") {
					// 		flsUserObj.booked++;
					// 	} else if (obj.status === "AVAILABLE") {
					// 		flsUserObj.available++;
					// 	}

					// 	// Check the child status values and add a new key to flsUserObj
					// 	const isAllBooked = flsUserObj.data.every((item: {status: string;}) => item.status === "BOOKED");
					// 	const isAllAvailable = flsUserObj.data.every((item: {status: string;}) => item.status === "AVAILABLE");

					// 	if (isAllBooked) {
					// 		flsUserObj.childStatus = "BOOKED";
					// 	} else if (isAllAvailable) {
					// 		flsUserObj.childStatus = "AVAILABLE";
					// 	} else {
					// 		flsUserObj.childStatus = "MIXED";
					// 	}

					// 	if (!dateObj.data.includes(flsUserObj)) {
					// 		dateObj.data.push(flsUserObj);
					// 	}

					// 	const existingDateIndex = acc.findIndex((item: {date: any;}) => item.date === obj.date);
					// 	if (existingDateIndex !== -1) {
					// 		acc[existingDateIndex] = dateObj;
					// 	} else {
					// 		acc.push(dateObj);
					// 	}

					// 	return acc;
					// }, []);


					this.availableFlsList = this.flsList.reduce((acc, obj) => {
						const dateObj = acc.find((item: {date: any;}) => item.date === obj.date) || {date: obj.date, timeslots: []};
						const timeslotObj = dateObj.timeslots.find((item: {timeslot: any;}) => item.timeslot === obj.startTime) || {timeslot: obj.startTime, slots: [], available: 0, booked: 0};



						const slot = {
							flsUserId: obj.flsUserId,
							flsName: obj.flsName,
							slotId: obj.slotId,
							startTime: obj.startTime,
							endTime: obj.endTime,
							status: obj.status
						};

						timeslotObj.slots.push(slot);

						// Update the available and booked counts
						if (obj.status === "BOOKED") {
							timeslotObj.booked++;
						} else if (obj.status === "AVAILABLE") {
							timeslotObj.available++;
						}

						const existingTimeslotIndex = dateObj.timeslots.findIndex((item: {timeslot: any;}) => item.timeslot === obj.startTime);
						if (existingTimeslotIndex !== -1) {
							dateObj.timeslots[existingTimeslotIndex] = timeslotObj;
						} else {
							dateObj.timeslots.push(timeslotObj);
						}

						const existingDateIndex = acc.findIndex((item: {date: any;}) => item.date === obj.date);
						if (existingDateIndex !== -1) {
							acc[existingDateIndex] = dateObj;
						} else {
							acc.push(dateObj);
						}

						return acc;
					}, []);


					this.formattedData = this.availableFlsList.map((dateObj: {date: any; timeslots: any[];}) => {

						const dateAvailable = dateObj.timeslots.reduce((total, timeslotObj) => total + timeslotObj.available, 0);
						const dateBooked = dateObj.timeslots.reduce((total, timeslotObj) => total + timeslotObj.booked, 0);

						return {
							date: dateObj.date,
							available: dateAvailable,
							booked: dateBooked,
							avaibility: `${ dateAvailable } / ${ dateBooked + dateAvailable }`,
							timeslots: dateObj.timeslots.map((timeslotObj: {slots: any; available: any; booked: any;}) => {
								const slots = timeslotObj.slots;
								const timeslotStart = slots[0]?.startTime || '';
								const timeslotEnd = slots[0]?.endTime || '';
								return {
									timeslotStart,
									timeslotEnd,
									slots,
									available: timeslotObj.available,
									booked: timeslotObj.booked,
									avaibility: `${ timeslotObj.available } / ${ timeslotObj.booked + timeslotObj.available }`,
								};
							}
							)
						};
					});

					// console.log(this.formattedData);

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

	updateSlot (url: string, slotId: number) {
		this.genericHttp.storeObjectDataByPatchMethod({"slotId": slotId}, url).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {
					this.toastr.success(`Data Updated Successfully`, `Success`);
					this.router.navigate(["/scheduling-qa/warehouse-company/list"]);
				} else {
					this.toastr.error(`Something went wrong, Please contact to administrator`, `${ response.status }`);
				}

			},
			error: (err: Error) => {
				this.toastr.error(err.message, `Error`);
			},
			complete: () => {
				// console.log('completed');

			}
		});
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

	getBgColor (booked: any, available: any) {
		let color = "#000000";

		// console.log(Math.abs((booked / (booked + available) * 100) - 100));



		const percentage = Math.abs((booked / (booked + available) * 100) - 100);

		if (percentage == 0) {
			return color = "#e51f1f";
		}

		if (percentage > 0 && percentage < 20) {
			return color = "#e51f1f";
		}

		// console.log(percentage);

		if (percentage > 21 && percentage < 40) {
			return color = "#f2a134";
		}

		if (percentage > 41 && percentage < 60) {
			return color = "#f7e379";
		}

		if (percentage > 61 && percentage < 80) {

			return color = "#bbdb44";
		}

		if (percentage > 81 && percentage < 100) {

			return color = "#44ce1b";
		}

		if (percentage == 100) {

			return color = "#44ce1b";
		}

		return color;
	}
}
