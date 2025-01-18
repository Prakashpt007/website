import {CommonModule} from '@angular/common';
import {Component, OnInit, HostListener} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

interface Options {
	value: any,
	label: string;
}

@Component({
	selector: 'app-multi-select',
	templateUrl: './multi-select.component.html',
	styleUrls: ['./multi-select.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
})

export class MultiSelectComponent implements OnInit {
	isDropdownOpen: boolean = false;
	searchText: string = '';
	options: Options[] = [
		{"value": 1, "label": "PENDING"},
		{"value": 2, "label": "DOCUMENT_SUBMITTED"},
		{"value": 3, "label": "VALIDATION_DONE"},
		{"value": 4, "label": "VALIDATION_FAILED"},
		{"value": 5, "label": "VERIFICATION_DONE"},
		{"value": 6, "label": "VERIFICATION_FAILED"},
		{"value": 7, "label": "EXPIRED"}
	];
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

	}

	isChecked (option: Options): boolean {
		return this.selectedOptionArray.some(item => item.value === option.value);
	}

	removeSelectedOption (option: Options): void {
		this.selectedOptionArray = this.selectedOptionArray.filter(item => item.value !== option.value);
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
