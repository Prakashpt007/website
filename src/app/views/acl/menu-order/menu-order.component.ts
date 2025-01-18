import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GenericHttpService} from '../../../services/generic-http.service';

@Component({
	selector: 'app-menu-order',
	templateUrl: './menu-order.component.html',
	styleUrls: ['./menu-order.component.scss'],
	standalone: false
})
export class MenuOrderComponent {
	mainMenuList: any[] = [];
	subMenuList: any[] = [];
	newOrderedList = {
		"mainMenuList": this.mainMenuList,
		"subMenuList": this.subMenuList
	};

	list: any[] = [
		{
			"id": 1,
			"mainMenu": "Dashboard",
			"order": "0",
			"subMenu": []
		},
		{
			"id": 2,
			"mainMenu": "Acl",
			"order": "1",
			"subMenu": [
				{
					"id": 1,
					"name": "User List",
					"order": "0"
				},
				{
					"id": 2,
					"name": "User Activity",
					"order": "0"
				},
				{
					"id": 3,
					"name": "User Permissions",
					"order": "0"
				},
				{
					"id": 44,
					"name": "Menu List",
					"order": "0"
				},
				{
					"id": 45,
					"name": "User Menu",
					"order": "0"
				}
			]
		},
		{
			"id": 11,
			"mainMenu": "Incomplete Case",
			"order": "10",
			"subMenu": [
				{
					"id": 40,
					"name": "Pending Cases",
					"order": "0"
				},
				{
					"id": 41,
					"name": "Unpaid Cases",
					"order": "0"
				}
			]
		},
		{
			"id": 12,
			"mainMenu": "Warehouse",
			"order": "11",
			"subMenu": [
				{
					"id": 42,
					"name": "Pending List",
					"order": "0"
				},
				{
					"id": 43,
					"name": "Approved List",
					"order": "0"
				},
				{
					"id": 46,
					"name": "Warehouse Type",
					"order": "0"
				}
			]
		},
		{
			"id": 3,
			"mainMenu": "Agri",
			"order": "2",
			"subMenu": [
				{
					"id": 4,
					"name": "Commodity",
					"order": "0"
				},
				{
					"id": 5,
					"name": "Variety",
					"order": "0"
				},
				{
					"id": 6,
					"name": "Crop Type",
					"order": "0"
				},
				{
					"id": 7,
					"name": "Quality",
					"order": "0"
				},
				{
					"id": 47,
					"name": "Parameter",
					"order": "0"
				},
				{
					"id": 48,
					"name": "Phenophase",
					"order": "0"
				},
				{
					"id": 49,
					"name": "Phenophase Duration",
					"order": "0"
				},
				{
					"id": 50,
					"name": "Commodity Parameter",
					"order": "0"
				},
				{
					"id": 51,
					"name": "Commodity Model",
					"order": "0"
				},
				{
					"id": 52,
					"name": "Plant Part Color",
					"order": "0"
				},
				{
					"id": 53,
					"name": "Quality Parameter Range",
					"order": "0"
				}
			]
		},
		{
			"id": 4,
			"mainMenu": "Geo",
			"order": "3",
			"subMenu": [
				{
					"id": 8,
					"name": "Continent",
					"order": "0"
				},
				{
					"id": 9,
					"name": "Country",
					"order": "0"
				},
				{
					"id": 10,
					"name": "Region",
					"order": "0"
				},
				{
					"id": 11,
					"name": "State",
					"order": "0"
				},
				{
					"id": 12,
					"name": "District",
					"order": "0"
				},
				{
					"id": 13,
					"name": "City",
					"order": "0"
				}
			]
		},
		{
			"id": 5,
			"mainMenu": "Gen",
			"order": "4",
			"subMenu": [
				{
					"id": 14,
					"name": "Bank",
					"order": "0"
				},
				{
					"id": 15,
					"name": "Bank Branch",
					"order": "0"
				},
				{
					"id": 16,
					"name": "Language",
					"order": "0"
				},
				{
					"id": 17,
					"name": "Market",
					"order": "0"
				},
				{
					"id": 18,
					"name": "Rejection Reason",
					"order": "0"
				},
				{
					"id": 19,
					"name": "Rejection Reason Type",
					"order": "0"
				},
				{
					"id": 20,
					"name": "Tender Type",
					"order": "0"
				},
				{
					"id": 21,
					"name": "Unit Of measurement",
					"order": "0"
				},
				{
					"id": 22,
					"name": "UOM Type",
					"order": "0"
				}
			]
		},
		{
			"id": 6,
			"mainMenu": "Case KYC",
			"order": "5",
			"subMenu": [
				{
					"id": 23,
					"name": "Farmer List",
					"order": "0"
				},
				{
					"id": 24,
					"name": "Warehouse List",
					"order": "0"
				},
				{
					"id": 25,
					"name": "Warehouse Company List",
					"order": "0"
				}
			]
		},
		{
			"id": 7,
			"mainMenu": "Case Finance",
			"order": "6",
			"subMenu": [
				{
					"id": 26,
					"name": "Company List",
					"order": "0"
				},
				{
					"id": 27,
					"name": "Land List",
					"order": "0"
				},
				{
					"id": 28,
					"name": "Farmer Bank List",
					"order": "0"
				},
				{
					"id": 29,
					"name": "Warehouse Farmer Bank List",
					"order": "0"
				},
				{
					"id": 30,
					"name": "Warehouse Company Bank List",
					"order": "0"
				}
			]
		},
		{
			"id": 8,
			"mainMenu": "Case Warehouse",
			"order": "7",
			"subMenu": [
				{
					"id": 31,
					"name": "Warehouse Farmer List",
					"order": "0"
				},
				{
					"id": 32,
					"name": "Warehouse Company List",
					"order": "0"
				}
			]
		},
		{
			"id": 9,
			"mainMenu": "Case Geo",
			"order": "8",
			"subMenu": [
				{
					"id": 33,
					"name": "Geo Plot List",
					"order": "0"
				},
				{
					"id": 34,
					"name": "Warehouse Farmer List",
					"order": "0"
				},
				{
					"id": 35,
					"name": "Warehouse Company List",
					"order": "0"
				},
				{
					"id": 36,
					"name": "Harvested Geo Tag List",
					"order": "0"
				}
			]
		},
		{
			"id": 10,
			"mainMenu": "Case Scheduling",
			"order": "9",
			"subMenu": [
				{
					"id": 37,
					"name": "Farmer List",
					"order": "0"
				},
				{
					"id": 38,
					"name": "Warehouse Farmer List",
					"order": "0"
				},
				{
					"id": 39,
					"name": "Warehouse Company List",
					"order": "0"
				}
			]
		}
	];

	constructor (private genericHttp: GenericHttpService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit (): void {
		this.genericHttp.getAllMenu().subscribe({
			next: (response: any) => {
				this.list = response.data;

				this.list = this.list
					.filter(item => item.order !== '' && item.mainMenu !== 'Dashboard')
					.sort((a, b) => parseFloat(a.order) - parseFloat(b.order))
					.map(item => ({
						...item,
						subMenu: item.subMenu
							.filter((subItem: {order: string;}) => subItem.order !== '')
							.sort((a: {order: string;}, b: {order: string;}) => {
								const orderA = parseFloat(a.order.split('.').join(''));
								const orderB = parseFloat(b.order.split('.').join(''));
								return orderA - orderB;
							})
					}));
			},
			error: (err: Error) => {
				// this.toastr.error(`${err.errorMessage}`, `${err.errorStatusCode}`);
				this.toastr.error(err.message, `Error`);
				this.list = this.list.map((item: any) => ({
					...item
				})).filter((item: {order: string;}) => item.order !== "0" && item.order != "");
			},
			complete: () => {
				// console.log('completed');

			}
		});

	}


	moveUp (index: number): void {
		if (index > 0) {
			this.swapItems(index, index - 1);
			this.updateLists();
		}
	}

	moveDown (index: number): void {
		if (index < this.list.length - 1) {
			this.swapItems(index, index + 1);
			this.updateLists();
		}
	}

	moveSubUp (parentIndex: number, childIndex: number): void {
		if (childIndex > 0) {
			this.swapSubItems(parentIndex, childIndex, childIndex - 1);
			this.updateLists();
		}
	}

	moveSubDown (parentIndex: number, childIndex: number): void {
		const subMenuLength = this.list[parentIndex].subMenu.length;
		if (childIndex < subMenuLength - 1) {
			this.swapSubItems(parentIndex, childIndex, childIndex + 1);
			this.updateLists();
		}
	}

	private swapItems (index1: number, index2: number): void {
		[this.list[index1], this.list[index2]] = [this.list[index2], this.list[index1]];

		// Update the order keys
		this.list[index1].order = (index1 + 1).toString();
		this.list[index2].order = (index2 + 1).toString();

		// Update submenu orders based on main menu order
		this.updateSubMenuOrders(this.list);
	}

	private updateSubMenuOrders (list: any[]): void {
		list.forEach((menuItem, mainIndex) => {
			const mainMenuOrder = menuItem.order;

			menuItem.subMenu.forEach((subItem: {order: string;}, subIndex: number) => {
				subItem.order = mainMenuOrder + '.' + (subIndex + 1);
			});
		});
	}

	private swapSubItems (parentIndex: number, childIndex1: number, childIndex2: number): void {
		const parent = this.list[parentIndex];
		[parent.subMenu[childIndex1], parent.subMenu[childIndex2]] = [
			parent.subMenu[childIndex2],
			parent.subMenu[childIndex1],
		];

		// Update the order keys
		this.updateSubMenuOrders(this.list);
	}

	private updateLists (): void {
		// Clear existing lists
		this.mainMenuList = [];
		this.subMenuList = [];

		// Update mainMenuList
		this.list.forEach((item) => {
			this.mainMenuList.push({
				mainMenu: item.mainMenu,
				id: item.id,
				order: item.order,
			});
			// Update subMenuList
			item.subMenu.forEach((subItem: {name: any; id: any; order: any;}) => {
				this.subMenuList.push({
					name: subItem.name,
					id: subItem.id,
					order: subItem.order,
				});
			});
		});

		this.newOrderedList["mainMenuList"] = this.mainMenuList;
		this.newOrderedList["subMenuList"] = this.subMenuList;

	}

	storeUpdatedOrder () {
		// console.log(this.list);
		// console.log(this.mainMenuList);
		// console.log(this.subMenuList);
		// console.log(this.newOrderedList);

		this.genericHttp.storeMenuOrder(this.newOrderedList).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.success) {
					this.toastr.success(`Data Updated Successfully`, `Success`);
					this.router.navigate(["/acl/menu/list"]);
					sessionStorage.removeItem('menu');
				} else {
					alert('Error');
				}
			},
			error: (err: any) => {
				if (err.error.status) {
					this.toastr.error(err.message, `Error`);
					this.changeDetectorRef.detectChanges();
				}
			},
			complete: () => {
				// console.log('completed');

			}
		});

	}
}
