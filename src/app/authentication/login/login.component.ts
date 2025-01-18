import {ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2} from "@angular/core";
import {isDevMode} from '@angular/core';

import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import {Router, UrlTree} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../services/authentication.service";
// import Validation from '../utility/validation';

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	standalone: false
})
export class LoginComponent {
	selectType = null;
	isDevModeActivate: boolean = false;
	logindata = [
		{
			id: 1,
			mobile: "9231571612",
			password: "admin@123"
		},
		{
			id: 2,
			mobile: "8058052366",
			password: "qacompany@123"
		},
		{
			id: 3,
			mobile: "8678987678",
			password: "Scheduling@123"
		},
		{
			id: 4,
			mobile: "8987856567",
			password: "WAREHOUSE@123"
		},
		{
			id: 5,
			mobile: "9655233666",
			password: "Telecaller@123"
		},
		{
			id: 6,
			mobile: "9678987678",
			password: "KML@123"
		},
		{
			id: 7,
			mobile: "9767675456",
			password: "FINANCE@123"
		},
		{
			id: 8,
			mobile: "9767898767",
			password: "INCOMPLETE@123"
		},
		{
			id: 9,
			mobile: "9878767889",
			password: "KYC@123"
		},
	];
	svgTemp: boolean = true;
	loginFormScreen: boolean = true;

	loginForm!: FormGroup;

	forgotPasswordForm: FormGroup = new FormGroup({
		recoveryMobileNo: new FormControl(""),
	});

	userDetailSubmit = false;
	forgotPasswordSubmit = false;
	passwordShow = "password";
	formErrorData!: any;
	scrHeight: any;
	scrWidth: any;

	@HostListener('window:resize', ['$event'])
	getScreenSize () {
		this.scrHeight = window.innerHeight;
		this.scrWidth = window.innerWidth;
		console.log('Device Height -', this.scrHeight);
		console.log('Device Width -', this.scrWidth);
	}
	constructor (
		public formBuilder: FormBuilder,
		private router: Router,
		private loginservice: AuthenticationService,
		private toastr: ToastrService,
		private el: ElementRef,
		private renderer2: Renderer2,
		private changeDetectorRef: ChangeDetectorRef
	) {
		this.isDevModeActivate = isDevMode();

		console.log("development mode", this.isDevModeActivate);

		this.checkTokenInSession();
		this.getScreenSize();
	}

	ngOnInit (): void {

		this.loginForm = this.formBuilder.group({
			mobile: ["", [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10), Validators.required]],
			password: ["", [Validators.required]],
			selectType: [""],
		});


		this.forgotPasswordForm = this.formBuilder.group({
			recoveryMobileNo: ["", [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10), Validators.required]]
		});
	}

	ngAfterViewInit () {
		const svgEl = this.el.nativeElement.querySelector('.svgEl');
		this.renderer2.setStyle(svgEl, 'height', `${ svgEl.offsetHeight }px`);
		// this.svgTemp = !this.svgTemp;
		setInterval(() => {
			this.svgTemp = !this.svgTemp;
		}, 5000);
	}

	checkTokenInSession () {
		const tokenAccess = sessionStorage.getItem("tokenAccess");
		// this.getUserProfileDetails();
		if (tokenAccess != null || tokenAccess != undefined) {

			if (localStorage.getItem('url') != null) {
				console.log(localStorage.getItem('url'));
				const url = localStorage.getItem('url');

				const urlTree: UrlTree = this.router.parseUrl(`${ url }`);

				const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
				const queryParams = urlTree.queryParams;

				console.log('URL without params:', urlWithoutParams);
				console.log('Query params:', queryParams);
				// window.location.reload();

				// Navigate to login with the extracted information
				this.router.navigate([urlWithoutParams], {
					queryParams: queryParams,

					//optional
					skipLocationChange: true,
					replaceUrl: true
				});

			} else {
				this.router.navigate(["/dashboard"]);
			}
		} else {
			this.router.navigate(["/login"]);
			return;
		}
	}

	getRequestParams (filterParams: object): any {
		let params: any = {};

		// Dynamic filter params
		for (const [key, value] of Object.entries(filterParams)) {

			if (value) {
				params[key] = value;
			}
		}
		// end

		return params;
	}

	get f (): {[key: string]: AbstractControl;} {
		// return this.form.controls;
		return this.loginForm.controls;
	}
	get g (): {[key: string]: AbstractControl;} {
		return this.forgotPasswordForm.controls;
	}

	submitLoginDetails () {
		this.userDetailSubmit = true;

		if (this.loginForm.invalid) {
			return;
		} else {
			this.loginUser(this.f["mobile"].value, this.f["password"].value);
		}
	}

	forgotPasswordFormSubmit () {
		this.forgotPasswordSubmit = true;

		if (this.forgotPasswordForm.invalid) {
			return;
		} else {
			//   console.log(this.forgotPasswordForm.getRawValue());

		}
	}

	loginUser (mobile: string, password: string) {
		this.loginservice.authenticate(mobile, password).subscribe({
			next: (response: any) => {
				if (response.access_token !== undefined && response.access_token != '') {
					this.checkTokenInSession();
				} else {
					//   console.log("response ==> ", response);
				}
			},
			error: (err: any) => {
				this.changeDetectorRef.detectChanges();
				if (err.error.status == 422) {
					this.formErrorData = err.error.data.formData.errors;

					this.toastr.error(`${ this.formErrorData[0].errorMessage }`, `${ "Error" }`);
					this.formErrorData.forEach((error: {name: any; errorMessage: any;}) => {
						const {name, errorMessage} = error;
						const control = this.loginForm.get(name);
						if (control) {
							control.setErrors({backendError: errorMessage});
						}
					});

				}
			},
			complete: () => {
				// console.log("completed");
			},
		});
	}

	passToggle () {
		if (this.passwordShow == "password") {
			this.passwordShow = "text";
		} else {
			this.passwordShow = "password";
		}
	}

	toggleLoginForm () {
		this.loginFormScreen = !this.loginFormScreen;
	}

	selectTypeChange (val: any) {
		let data = this.logindata.filter((item: any) => item.id == Number(val));

		if (data[0].mobile != null && data[0].password) {
			this.loginForm.patchValue({
				mobile: data[0]['mobile'],
				password: data[0]['password'],
			});

			this.passwordShow = "text";
		}
	}
}
