import {Component, Output, EventEmitter, Renderer2, ElementRef, ViewChild} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {Router, NavigationEnd, ActivatedRoute} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subject, filter, map, takeUntil} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	standalone: false
})
export class HeaderComponent {
	@ViewChild("logoutConfirmation") logoutConfirmation!: ElementRef;
	sidebarActive: boolean = true;
	title = "CropData";
	pageTitle!: string | null;

	userDetails: {full_name: string | null, userThumbnail: string | null, userActivities: string | null;} = {full_name: '', userThumbnail: '', userActivities: '', };

	@Output() sidebarStatus = new EventEmitter<any>();

	destroy$: Subject<void>;

	constructor (private route: ActivatedRoute, private router: Router, private renderer: Renderer2, private titleService: Title, private authService: AuthenticationService, private modalService: NgbModal) {

		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => {
					let route: ActivatedRoute = this.router.routerState.root;
					let routeTitle = "";
					while (route!.firstChild) {
						route = route.firstChild;
					}
					if (route.snapshot.data["title"]) {
						routeTitle = route!.snapshot.data["title"];
					}
					this.pageTitle = "";
					this.pageTitle = routeTitle;

					return routeTitle;
				})
			)
			.subscribe((title: string) => {
				if (title) {
					this.titleService.setTitle(`${ title } - ${ this.title }`);
					this.pageTitle = "";
					this.pageTitle = title;
					if (this.pageTitle == 'Dashboard') {
						let getName = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('full_name') : undefined;
						this.pageTitle = `Hello, ${ getName?.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }`;
					}
				}
			});

		this.destroy$ = new Subject<void>();
	}

	ngOnInit (): void {
		this.checkForMobileScreen();
		//


		// Close Sidebar if route change in small devices
		if (window.innerWidth < 768) {
			// Rount Change Event
			this.router.events
				.pipe(
					takeUntil(this.destroy$),
				)
				.subscribe((event) => {
					if (event instanceof NavigationEnd) {
						// The route has changed, you can perform actions here
						this.sidebarActive = false;
						this.sidebarStatus.emit(this.sidebarActive);
						if (typeof localStorage !== 'undefined') {
							localStorage.setItem("sidebar", `${ this.sidebarActive }`);
						}
					}
				});
		}
		//End
	}

	ngOnDestroy () {
		this.destroy$.next();
		this.destroy$.complete();
	}

	ngAfterViewInit () {


		const full_name = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('full_name') !== null : undefined;
		const userThumbnail = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('userThumbnail') !== null : undefined;
		const userActivities = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('userActivities') !== null : undefined;

		if (full_name) {
			this.userDetails.full_name = `${ sessionStorage.getItem('full_name') }`;
		}
		if (userThumbnail) {
			this.userDetails.userThumbnail = `${ sessionStorage.getItem('userThumbnail') }?${ new Date().toJSON() }`;
		}
		if (userActivities) {
			this.userDetails.userActivities = `${ sessionStorage.getItem('userActivities') }`;
		}
		if (typeof localStorage !== 'undefined') {
			if (localStorage.getItem("sidebar") === null) {
				localStorage.setItem("sidebar", `${ this.sidebarActive }`);
			} else {
				if (localStorage.getItem("sidebar") === "true") {
					this.sidebarActive = true;
				} else if (localStorage.getItem("sidebar") === "false") {
					this.sidebarActive = false;
				} else {
					// alert("nothing");
				}
			}
		}
		this.sidebarStatus.emit(this.sidebarActive);
	}

	toggleMenu () {
		this.sidebarActive = !this.sidebarActive;
		this.sidebarStatus.emit(this.sidebarActive);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem("sidebar", `${ this.sidebarActive }`);
		}
	}

	checkForMobileScreen () {
		if (window.innerWidth < 768) {
			this.sidebarActive = !this.sidebarActive;
			this.sidebarStatus.emit(this.sidebarActive);
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem("sidebar", `${ this.sidebarActive }`);
			}
		} else {
			let checkSts: any = undefined;
			if (localStorage.getItem("sidebar") === null) {
				localStorage.setItem("sidebar", `${ this.sidebarActive }`);
				checkSts = localStorage.getItem("sidebar");
			} else {
				checkSts = localStorage.getItem("sidebar");
			}
			this.sidebarActive = checkSts;
			this.sidebarStatus.emit(this.sidebarActive);
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem("sidebar", `${ this.sidebarActive }`);
			}
		}
	}

	logout () {
		this.authService.logOut();
	}

	getUserThumb (): string | null {
		return (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem("userThumbnail") : null;
	}

	private updateStylesheetLink (theme: string) {
		// const linkElement = document.querySelector('link[href="styles.css"]');
		// if (document.querySelector('link[href="styles.css"]')) {
		//   // Determine the new stylesheet URL based on the theme
		//   const newStylesheet = theme === 'dark' ? 'styles-dark.css' : 'styles.css';

		//   // Update the href attribute of the link element
		//   this.renderer.setAttribute(linkElement, 'href', newStylesheet);
		// }

		// if (document.querySelector('link[href="styles-dark.css"]')) {
		//   const newStylesheet = theme === 'dark' ? 'styles.css' : 'styles-dark.css';

		//   // Update the href attribute of the link element
		//   this.renderer.setAttribute(linkElement, 'href', newStylesheet);
		// }
	}

	confirmLogout () {
		this.modalService.open(this.logoutConfirmation, {size: 'md', scrollable: true, centered: true, backdrop: true}).result.then(

			// {
			//     size: 'md',
			//     scrollable: true,
			//     centered: true,
			//     backdrop: 'static' //  backdrop: true //  backdrop: false
			// }
			(result) => {
				this.logout();
			},
			(reason) => {
				// console.log(`Dismissed ${ this.getDismissReason(reason) }`);
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
