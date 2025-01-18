import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, signal, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {MenuItem} from '../sidebar/sidebar.component';


@Component({
	selector: 'app-search-menu',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule,
		ReactiveFormsModule,
		RouterModule
	],
	templateUrl: './search-menu.component.html',
	styleUrls: ['./search-menu.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMenuComponent {
	@ViewChild("searchResultModel") searchResultModel!: ElementRef;

	@Input() designStyle: number | undefined = 0;
	searchMenuForm!: FormGroup;
	searchMenuFormSubmitHandler = false;
	searchMenuResultList: any[] = [];
	searchMenuList = signal<any[]>([]);
	loading = signal<boolean>(true);

	constructor (public formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private modalService: NgbModal, private changeDetectorRef: ChangeDetectorRef) {

	}

	ngOnInit () {
		this.searchMenuForm = this.formBuilder.group({
			searchMenu: ["", [Validators.pattern(/^[a-zA-Z]/), Validators.minLength(1), Validators.maxLength(20)]],
		});

		this.waitForSessionStorageData();

	}

	waitForSessionStorageData () {
		const timeoutDuration = 10000; // Wait for 10 seconds
		const checkInterval = 500; // Check every 500ms
		const startTime = Date.now();

		const interval = setInterval(() => {
			const menuData = sessionStorage.getItem('menu');
			if (menuData) {
				clearInterval(interval); // Stop checking
				this.processMenuData(menuData);
			} else if (Date.now() - startTime > timeoutDuration) {
				clearInterval(interval); // Stop after timeout
				console.warn('Menu data not found in sessionStorage within the timeout period');
				this.loading.set(false); // Stop loading
			}
		}, checkInterval);
	}

	processMenuData (menuData: string) {
		try {
			const parsedMenu = JSON.parse(menuData).filter(
				(item: {subMenu: any[];}) => item.subMenu && item.subMenu.length > 0
			);
			this.searchMenuList.set(parsedMenu);
			this.loading.set(false); // Stop loading
		} catch (error) {
			console.error('Error parsing menu data:', error);
			this.loading.set(false); // Stop loading
		}
	}

	ngAfterViewInit () {
		// console.log(this.searchMenuList);

	}

	get f (): {[key: string]: AbstractControl;} {
		return this.searchMenuForm.controls;
	}
	searchFormSubmit () {
		this.searchMenuFormSubmitHandler = true;
		if (this.searchMenuForm.invalid) {
			return;
		} else {
			this.searchMenuResultList = [];

			let searchValue = this.searchMenuForm.get('searchMenu')?.value.toLowerCase();
			let regex = new RegExp(`\\b${ searchValue }`, 'i'); // '\b' for word boundary, 'i' flag for case-insensitive matching

			this.searchMenuResultList = this.searchMenuList().map(item => {
				let matchingSubMenus = item.subMenu.filter((subItem: {name: string;}) => regex.test(subItem.name.toLowerCase()));
				let mainMenuMatch = regex.test(item.mainMenu.toLowerCase());
				return {
					...item,
					subMenu: mainMenuMatch ? item.subMenu : matchingSubMenus, // Keep submenus even if main menu matches
					mainMenuMatch: mainMenuMatch
				};
			}).filter(item => item.mainMenuMatch || item.subMenu.length > 0);

			//--------------------------------------------

			if (this.searchMenuResultList.length > 0) {
				this.modalService.open(this.searchResultModel, {size: 'lg', scrollable: true, centered: true, backdrop: 'static'}).result.then(
					(result) => {
						console.log(result);
					},
					(reason) => {
						// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
						// console.log(`Dismissed ${ this.getDismissReason(reason) }`);
					}

				);
			} else {
				this.toastr.warning('Search Result Not Found', `Warning`);
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
}