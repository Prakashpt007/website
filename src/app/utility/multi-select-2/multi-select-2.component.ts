import {CommonModule} from '@angular/common';
import {Component, OnInit, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


interface Options {
	value: any,
	label: string;
}

@Component({
	selector: 'app-multi-select-2',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './multi-select-2.component.html',
	styleUrl: './multi-select-2.component.scss'
})
export class MultiSelect2Component implements OnInit {
	@Input() options: Options[] = [];
	@Output() valueSelected = new EventEmitter<any>();


	isDropdownOpen: boolean = false;
	searchText: string = '';

	selectedOptionArray: Options[] = [];

	selected: number[] = [];

	constructor () { }

	ngOnInit (): void {
		this.selected.forEach(
			(value) => {
				this.options.forEach(
					(option) => {
						if (option.value === value) {
							this.selectedOptionArray.push(option);
						}
					}
				);
			}
		);

	}

	toggleDropdown (): void {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	onCheckboxChange (option: Options, isChecked: any): void {
		if (isChecked.currentTarget.checked) {
			// Add option to selected options if it's not already selected
			if (!this.selectedOptionArray.some(selected => selected.value === option.value)) {
				this.selectedOptionArray.push(option);
			}
		} else {
			// Remove the option from the selected options
			this.selectedOptionArray = this.selectedOptionArray.filter(item => item.value !== option.value);
		}
		this.updateSelectedOption(this.selectedOptionArray);
	}

	isChecked (option: Options): boolean {
		return this.selectedOptionArray.some(item => item.value === option.value);
	}

	removeSelectedOption (option: Options): void {
		this.selectedOptionArray = this.selectedOptionArray.filter(item => item.value !== option.value);
		this.updateSelectedOption(this.selectedOptionArray);
	}

	updateSelectedOption (values: Options[]): void {
		this.selected = values.map(item => item.value);
		this.valueSelected.emit(this.selected);
	}

	get filteredOptions (): Options[] {
		if (!this.searchText) return this.options;
		return this.options.filter(option =>
			option.label.toLowerCase().includes(this.searchText.toLowerCase())
		);
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick (event: MouseEvent): void {
		if (!(event.target as HTMLElement).closest('.multiselect-container')) {
			this.isDropdownOpen = false;
		}
	}
}
