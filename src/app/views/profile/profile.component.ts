import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageCroppedEvent} from 'ngx-image-cropper';

import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import Validation from '../../utility/validation';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	standalone: false
})
export class ProfileComponent {
	userId!: number;
	form!: FormGroup;
	formSubmitHandler = false;

	changePasswordForm!: FormGroup;
	changePasswordFormSubmitHandler = false;
	userActivityList: Array<any> = [];
	changePasswordUrl: string = '';
	profileDetailsStoreUrl: string = '';
	profilePhotoStoreUrl: string = '';
	userProfilePhotograph: string = '';

	minDate!: any;
	maxDate!: any;

	dModal: string = 'display:none;';
	profilePhotoForm!: FormGroup;
	profilePhotoFormSubmitHandler = false;
	// End
	autocompleteValue: string;

	selectedFile!: any;
	@ViewChild("cropperModal") cropperModal!: ElementRef;


	currentPasswordShow = "password";
	passwordShow = "password";
	confirmPasswordShow = "password";
	formErrorData: any = {};


	sampleOptions = [
		{"value": 1, "label": "PENDING"},
		{"value": 2, "label": "DOCUMENT_SUBMITTED"},
		{"value": 3, "label": "VALIDATION_DONE"},
		{"value": 4, "label": "VALIDATION_FAILED"},
		{"value": 5, "label": "VERIFICATION_DONE"},
		{"value": 6, "label": "VERIFICATION_FAILED"},
		{"value": 7, "label": "EXPIRED"}
	];
	getValues (value: any) {
		console.log(value);
	}

	constructor (private sanitizer: DomSanitizer, public formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService, private userService: UserService, private router: Router, private authService: AuthenticationService, private modalService: NgbModal) {
		this.autocompleteValue = 'off' + Math.random().toString(36).substring(7);
	}

	ngOnInit (): void {
		this.form = this.formBuilder.group({
			fullName: [""],
			mobileNo: ["", [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(6), Validators.maxLength(10)]],
			email: ["", [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(145)]],
			dob: [""],
			gender: [""],
		});

		this.profilePhotoForm = this.formBuilder.group({
			profilePhoto: ["", Validators.required],
		});

		this.changePasswordForm = this.formBuilder.group({
			currentPassword: ["", Validators.required],
			newPassword: ["", Validators.required],
			cPassword: ["", Validators.required],
		}, {
			validators: [Validation.match('newPassword', 'cPassword')]
		});

		this.userId = Number(sessionStorage.getItem("userId"));

		if (!(this.userId == null) && !(this.userId == 0)) {
			this.getData(this.userId);
		} else {
			this.authService.logOut();
			this.toastr.info('Please Log In!');
			this.router.navigate(['/login']);
		}

		this.setDate();
	}

	get f (): {[key: string]: AbstractControl;} {
		return this.form.controls;
	}

	get p (): {[key: string]: AbstractControl;} {
		return this.changePasswordForm.controls;
	}

	get i (): {[key: string]: AbstractControl;} {
		return this.profilePhotoForm.controls;
	}

	formSubmit () {
		this.formSubmitHandler = true;
		if (this.form.invalid) {
			return;
		} else {
			if (!(this.userId == null) && !(this.userId == 0)) {
				// const formData: any = {};
				// formData['email'] = this.form.get('email')?.value;
				const formData = new FormData();
				formData.append('email', this.form.get('email')?.value);
				formData.append('fullName', this.form.get('fullName')?.value);
				formData.append('dob', this.form.get('dob')?.value);
				formData.append('gender', this.form.get('gender')?.value);
				formData.append('_method', 'PUT');

				this.userService.storeUserDetails(formData, this.profileDetailsStoreUrl).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.success == true) {
							this.toastr.success(`Data Updated Successfully`, `Success`);
							this.form.reset();
							this.formSubmitHandler = false;
							this.getData(this.userId);

						} else {
							alert('Error');
						}
					},
					error: (err: any) => {
						console.log(err);
						this.toastr.error(`${ err.message }`, `Error`);
					},
					complete: () => {
						// console.log('completed');
					}
				});
			}
		}

	}

	changePasswordFormSubmit () {
		this.changePasswordFormSubmitHandler = true;
		if (this.changePasswordForm.invalid) {
			return;
		} else {
			if (!(this.userId == null) && !(this.userId == 0)) {

				const formData = new FormData();
				formData.append('currentPassword', this.changePasswordForm.get('currentPassword')?.value);
				formData.append('newPassword', this.changePasswordForm.get('newPassword')?.value);
				formData.append('_method', 'PUT');
				// formData['currentPassword'] = this.changePasswordForm.get('currentPassword')?.value;
				// formData['newPassword'] = this.changePasswordForm.get('newPassword')?.value;

				this.userService.changePasswordRequest(formData, this.changePasswordUrl).subscribe({
					next: (response: any) => {
						if (response.status == 200 || response.success == true) {
							this.toastr.success(`Password Change Successfully`, `Success`);
							this.changePasswordForm.reset();
							this.changePasswordFormSubmitHandler = false;
							this.authService.logOut();
							this.router.navigate(['/login']);
							this.toastr.info('Please Log In!');

						} else {
							alert('Error');
						}
					},
					error: (err: any) => {
						if (err.error.status == 422) {

							this.formErrorData = err.error.data.formData.errors;

							Object.keys(this.formErrorData).forEach(item => {
								const control = this.changePasswordForm.get(this.formErrorData[item].name);

								if (control) {
									const errorMessages = this.formErrorData[item].errorMessage;
									control.setErrors({backendError: errorMessages});
								}
							});
							this.changePasswordForm.get('cPassword')?.reset();
							this.changeDetectorRef.detectChanges();
							this.toastr.error('Someting Went Wrong', `Error`);
						} else {
							this.toastr.error(err.error, `Error`);
						}
					},
					complete: () => {
						// console.log('completed');
					}
				});
			}
		}
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


	setDate () {
		let date = new Date();
		let date2 = new Date();
		date.setFullYear(date.getFullYear() - 18);
		this.maxDate = date.toISOString().split("T")[0];
		// this.maxDate = date.toISOString().split("T")[0];
		date2.setFullYear(date2.getFullYear() - 100);
		this.minDate = date2.toISOString().split("T")[0];
	}

	getData (userId: number) {
		this.userProfilePhotograph = 'assets/images/user.jpg';
		this.userService.getUserDetails(`user/${ userId }/profile`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {
					let formData = response.data;
					this.profileDetailsStoreUrl = formData.storeUrl;
					this.changePasswordUrl = formData.changePasswordUrl;

					this.form.patchValue({
						mobileNo: formData.mobileNo,
						email: formData.email,
						fullName: formData.fullName,
						dob: formData.dob,
						gender: formData.gender,
					});
					this.userActivityList = formData.activities;
					this.form.get('mobileNo')?.disable();


				}
			},
			error: (err: Error) => {
				console.log(err);
				this.toastr.error(`${ err.message }`, `Error`);
			},
			complete: () => {
				// console.log('completed');
			}

		});

		this.userService.getUserProfileImage(`user/${ userId }/photo`).subscribe({
			next: (response: any) => {
				if (response.success == 200 || response.success == true) {
					// console.log(response);
					this.profilePhotoStoreUrl = response.data.storeUrl;
					this.userProfilePhotograph = response.data.profilePhoto == null || response.data.profilePhoto == "" ? 'assets/images/user.jpg' : `${ response.data.profilePhoto }?time${ Math.floor(1000 + Math.random() * 9000) }`;
					// sessionStorage.setItem('userThumbnail', this.userProfilePhotograph);
				}
			},
			error: (err: Error) => {
				console.log(err);
				this.toastr.error(`${ err.message }`, `Error`);
			},
			complete: () => {
				// console.log('completed');
			}

		});

	};

	profilePhotoFormSubmit () {
		this.profilePhotoFormSubmitHandler = true;
		if (this.profilePhotoForm.invalid) {
			return;
		} else {

			if (this.selectedFile != undefined) {
				const formData = new FormData();
				formData.append('profilePhoto', this.selectedFile);
				formData.append('_method', 'PUT');

				this.userService.storeUserProfileImage(formData, this.profilePhotoStoreUrl).subscribe({
					next: (response: any) => {
						if (response.success == 200 || response.success == true) {
							this.toastr.success('Profile Photo Has Been Updated Successfully', 'Success');
							this.modalService.dismissAll();
							this.profilePhotoForm.reset();
							this.profilePhotoFormSubmitHandler = false;
							this.selectedFile = undefined;
							this.authService.logOut();
							this.toastr.info('Please Log In! To See Changes', 'Info');
							this.router.navigate(['/login']);

							// this.getData(this.userId);
						}
					},
					error: (err: Error) => {
						console.log(err);
						this.toastr.error(`${ err.message }`, `Error`);
					},
					complete: () => {
						// console.log('completed');
					}

				});
			} else {
				alert('File Not Selected or Incorrect');
			}
		}
	}



	onPhotoChoose (event: any) {
		let file = event.target.files[0];

		if (file != null || file != undefined) {
			if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
				console.log("correct", file.type);

				if (file.size > 20000000) {
					console.log("incorrect", file.size);
					this.toastr.warning('File is too big..! Please select less than 20MB.', 'Warning');
				} else {
					console.log(file);
					// this.selectedFile = file
					this.onFileChange(event); {
						this.imgName = file.name;
					}
				}

			} else {
				console.log("incorrect", file.type);
				this.toastr.warning("Invalid file..! Please select JPEG, JPG, PNG only.", "Warning");
			}
		}
	}

	imgChangeEvt: any = '';
	imgName: any = '';
	cropImgPreview: any = '';
	onFileChange (event: any): void {
		this.imgChangeEvt = event;
		this.modalService.open(this.cropperModal, {size: 'xl', scrollable: true, centered: true}).result.then(
			(result) => {
				console.log(`Closed with: ${ result }`);
			},
			(reason) => {
				console.log(`Dismissed ${ this.getDismissReason(reason) }`);
			}
		);
	}
	cropImg (event: ImageCroppedEvent) {
		console.log(event);
		this.cropImgPreview = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || event.base64 || '');
		this.cropImageUpdate(this.cropImgPreview.changingThisBreaksApplicationSecurity);
	}

	cropImageUpdate (blobUrl: any) {
		fetch(blobUrl)
			.then((response) => response.blob())
			.then((blob) => {
				const file = new File([blob], this.imgName, {type: blob.type});
				this.selectedFile = file;
				return file;
			})
			.catch((error) => {
				console.error('Error fetching blob data', error);
				alert('Error fetching blob data');
			});
	}

	imgLoad () {
		// display cropper tool
	}

	initCropper (event: any) {
		// init cropper
		// console.log(event);

	}

	imgFailed (event: any) {
		// error msg
		// console.log(event);
	}
}
