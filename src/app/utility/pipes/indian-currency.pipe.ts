import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
	name: 'indianCurrency',
	standalone: true
})
export class IndianCurrencyPipe implements PipeTransform {
	constructor (private sanitizer: DomSanitizer) { }

	transform (value: number | string, currencySymbol: string = '&#8377;'): SafeHtml {
		if (value === null || value === undefined) {
			return '';
		}

		const amount = typeof value === 'number' ? value.toString() : value;

		// Split the number into integer and decimal parts
		const [integerPart, decimalPart] = amount.split('.');

		// Format the integer part for Indian numbering (lakhs, crores)
		const lastThreeDigits = integerPart.slice(-3);
		const otherDigits = integerPart.slice(0, -3);

		const formattedIntegerPart = otherDigits
			? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThreeDigits
			: lastThreeDigits;

		// Combine integer and decimal parts
		const formattedValue = decimalPart ? `${ formattedIntegerPart }.${ decimalPart }` : formattedIntegerPart;

		// Return the sanitized HTML with currency symbol
		return this.sanitizer.bypassSecurityTrustHtml(`${ currencySymbol }${ formattedValue }`);
	}
}
