import {Component, Input, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, Output, EventEmitter} from "@angular/core";

import {trigger, state, style, animate, transition} from "@angular/animations";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GenericHttpService} from "../../services/generic-http.service";
import {Subscription} from "rxjs";

export interface SubMenuItem {
	order?: any;
	name: string;
	href: string;
	icon: string;
	activity?: string[];
	status?: string | boolean; // Add status property
}

export interface MenuItem {
	order?: any;
	mainMenu: string;
	href: string;
	icon: string;
	activity?: string[];
	subMenu: SubMenuItem[];
	status?: boolean; // Add status property
}
@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.scss"],
	standalone: false,
	animations: [
		trigger("slide", [
			transition(":enter", [
				style({marginLeft: "-14.0625rem"}),
				animate("300ms ease", style({marginLeft: "0"})),
			]),
			transition(":leave", [
				style({marginLeft: "0"}),
				animate("300ms ease", style({marginLeft: "-14.0625rem"})),
			]),
		]),

		trigger("submenuAnimation", [
			state(
				"open",
				style({
					height: "*",
					padding: "0.625rem 0;",
					// borderWidth: "0.125rem 0 0 0"
				})
			),
			state(
				"closed",
				style({
					height: "0rem",
					// overflowY: "hidden",
					padding: "0rem",
					// borderWidth: "0",
				})
			),
			transition("open <=> closed", animate("300ms ease-in-out")),
		]),
	],
})

export class SidebarComponent {
	@ViewChild("searchResultModel") searchResultModel!: ElementRef;

	@Input() sidebarStatus!: boolean;

	@Output() sidebarSts = new EventEmitter<any>();

	userActivity!: string[] | undefined;

	userDetails: {full_name: string | null, userThumbnail: string | null, userActivities: string | null;} = {full_name: '', userThumbnail: '', userActivities: '', };

	menuList!: MenuItem[];

	panelOpenState = false;
	private routerEventSubscription!: Subscription;
	constructor (public formBuilder: FormBuilder, private elementRef: ElementRef, private route: ActivatedRoute, private router: Router, private genericHttp: GenericHttpService, private toastr: ToastrService, private modalService: NgbModal, private changeDetectorRef: ChangeDetectorRef) {
	}

	ngOnInit (): void {
		this.routerEventSubscription = this.router.events.subscribe((event) => {


			if (event instanceof NavigationEnd) {
				// // Get the current URL and segments
				// const currentUrl = event.url;
				// const segments = currentUrl.split('/');

				// // Check if the parent route is the same as its siblings
				// const isSameParent = segments.length >= 3 && segments[1] === segments[2];

				// // Check if the params are present and handle the case when they are not
				// const params = this.route.snapshot.queryParams;
				// const hasParams = Object.keys(params).length > 0;


				// // localStorage.removeItem('url');
				// // Add the 'active' class based on the result
				// if (isSameParent && !hasParams) {


				// 	// Add your logic to add the 'active' class
				// 	// console.log('Parent is same as siblings and has no params');
				// } else if (segments[3].includes("list")) {
				// 	this.updateMenuStatus(this.menuList);
				// } else {
				// 	// Add your logic for other scenarios
				// 	// console.log('Different scenario');
				// 	// this.updateMenuStatus(this.menuList);
				// }
				this.updateMenuStatus(this.menuList);
			}
		});


		// this.userActivity = this.genericHttp.getUserActivities();
		this.userActivity = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('userActivities')?.replaceAll(' ', '').split(',') : undefined;

		const full_name = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('full_name') !== null : undefined;
		const userThumbnail = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('userThumbnail') !== null : undefined;
		const userActivities = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('userActivities') !== null : undefined;

		const usermenu = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('menu') !== null : undefined;
		if (usermenu) {
			this.menuList = JSON.parse(`${ sessionStorage.getItem('menu') }`); // Retrieve menu from sessionStorage

			this.updateMenuStatus(this.menuList);


		} else {

			if (userActivities) {
				this.genericHttp.getUserMenu((typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('userActivities')?.split(',') : undefined).subscribe({
					next: (response: any) => {
						// console.log(response.data);
						let menuData: MenuItem[] = response.data;
						// let menuData: MenuItem[] = this.tempMenuList;

						this.menuList = menuData.reduce<MenuItem[]>((acc, mainMenu) => {
							const hasMainMenuActivity = mainMenu.activity?.some(role => this.userActivity?.includes(role));
							const filteredSubMenu = mainMenu.subMenu?.filter(subMenu => subMenu.activity?.some(role => this.userActivity?.includes(role))) || [];

							if (hasMainMenuActivity || filteredSubMenu.length > 0) {
								acc.push({...mainMenu, subMenu: filteredSubMenu});
							}
							return acc;
						}, []);

						this.menuList = this.menuList.slice().sort((a, b) => this.naturalSort(a.order, b.order));
						// Sort submenus for each main menu
						this.menuList.forEach(menuItem => {
							if (menuItem.subMenu) {
								menuItem.subMenu = menuItem.subMenu.sort((a, b) => this.naturalSort(a.order, b.order));
							}
						});


						let dashboardObj: MenuItem = {
							mainMenu: "Dashboard",
							href: "/dashboard",
							icon: "<i class='fa-solid fa-chart-simple fa-lg'></i>",
							order: "0",
							subMenu: []
						};

						this.menuList = [dashboardObj].concat(this.menuList);

						(typeof sessionStorage !== 'undefined') ? sessionStorage.setItem('menu', `${ JSON.stringify(this.menuList) }`) : undefined;






						this.updateMenuStatus(this.menuList);

					},
					error: (err: Error) => {
						// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
						this.toastr.error(err.message, `Error`);
					},
					complete: () => {
						// console.log('completed');
					}
				});
			}

		}

		if (full_name) {
			this.userDetails.full_name = `${ sessionStorage.getItem('full_name') }`;
		}
		if (userThumbnail) {
			this.userDetails.userThumbnail = `${ sessionStorage.getItem('userThumbnail') }?${ new Date().toJSON() }`;
		}
		if (userActivities) {
			this.userDetails.userActivities = `${ sessionStorage.getItem('userActivities') }`;
		}
	}

	ngOnDestroy () {
		if (this.routerEventSubscription) {
			this.routerEventSubscription.unsubscribe();
		}
	}


	naturalSort (a: string, b: string) {
		const aParts = a.split('.').map((part: string) => parseInt(part, 10));
		const bParts = b.split('.').map((part: string) => parseInt(part, 10));

		for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
			const aNum = aParts[i] || 0;
			const bNum = bParts[i] || 0;

			if (aNum !== bNum) {
				return aNum - bNum;
			}
		}

		return 0;
	}

	updateMenuStatus (menuItems: any): void {
		const currentUrl = this.router.routerState.snapshot.url.split('/');

		if (menuItems) {

			menuItems.forEach((menuItem: {href: any; status: any; subMenu: any[];}) => {

				if (menuItem.subMenu.length > 0) {

					menuItem.status = menuItem.subMenu.some(
						(subMenuItem: {href: string;}) => subMenuItem.href && subMenuItem.href.split('/')[1].includes(currentUrl[1]) && subMenuItem.href.split('/')[2].includes(currentUrl[2])
					);

					// if (menuItem.status) {
					// 	menuItem.subMenu.forEach((subMenuItem) => {
					// 		console.log('yes');


					// 		subMenuItem.status = subMenuItem.href && subMenuItem.href.split('/')[1].includes(currentUrl[1]);
					// 		console.log(subMenuItem.status);

					// 	});
					// } else if (menuItem.href && currentUrl.includes(menuItem.href)) {
					// 	console.log('yes 2');

					// 	// menuItem.status = true;
					// }

				} else {
					if (currentUrl.length > 3) {
						menuItem.status = false;

					} else {
						menuItem.status = true;
					}
				}
			});
			setTimeout(() => {
				this.scrollToElement();
			}, 300);
		}
	}

	toggleSubmenu (item: MenuItem): void {
		this.menuList.forEach((menuItem) => {
			if (menuItem !== item) {
				menuItem.status = false;
			}
		});
		item.status = !item.status;
	}

	closeOtherSubmenusAndToggle (parentItem: MenuItem, submenuItem: SubMenuItem): void {
		this.menuList.forEach((menuItem) => {
			if (menuItem !== parentItem) {
				menuItem.status = false;
			}
		});
		parentItem.status = true;
		submenuItem.status = !submenuItem.status;
	}

	clearActiveMenu () {
		this.menuList.forEach((menuItem) => {
			if (menuItem.status) {
				menuItem.status = false;
			}
		});
	}

	scrollToElement () {
		setTimeout(() => {
			const element = this.elementRef.nativeElement.querySelector('.mat-expanded a.active'); // Adjust to your active item class
			const element2 = this.elementRef.nativeElement.querySelector('.mat-expansion-panel.mat-expanded'); // Adjust to your active item class

			if (element) {
				const container = this.elementRef.nativeElement.querySelector('.navlist'); // Use the '.navlist' class as the scrollable container
				if (container) {
					const containerRect = container.getBoundingClientRect();
					const elementRect = element.getBoundingClientRect();

					// Calculate the top scroll position to center the mat-expanded item
					const scrollTop = container.scrollTop + (elementRect.top - containerRect.top) - (container.clientHeight / 2) + (elementRect.height / 2);

					container.scrollTo({
						top: scrollTop,
						behavior: 'smooth'
					});
				} else {
					console.warn('Container with class .navlist not found.');
				}
			} else if (element2) {
				const container2 = this.elementRef.nativeElement.querySelector('.navlist'); // Use the '.navlist' class as the scrollable container
				if (container2) {
					const containerRect = container2.getBoundingClientRect();
					const elementRect2 = element2.getBoundingClientRect();

					// Calculate the top scroll position to center the mat-expanded item
					const scrollTop = container2.scrollTop + (elementRect2.top - containerRect.top) - (container2.clientHeight / 2) + (elementRect2.height / 2);

					container2.scrollTo({
						top: scrollTop,
						behavior: 'smooth'
					});
				} else {
					console.warn('Container with class .navlist not found.');
				}

			} else {
				console.warn('Element with class .mat-expanded not found.');
			}
		}, 300); // Adjust timeout as necessary

	}
}
