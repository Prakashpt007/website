import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'formatText',
	standalone: true
})
export class FormatTextPipe implements PipeTransform {
	transform (value: string): string {
		if (!value) return '';

		// Split the string by underscores
		const words = value.split('_');

		// Capitalize the first letter of each word and lowercase the rest
		const formattedWords = words.map(word =>
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		);

		let formattedWordsChange = formattedWords.map((el: string) => {
			switch (el) {
				case 'Fls':
					return 'FLS';
				case 'Prs':
					return 'PRS';
				case 'Rlm':
					return 'RLM';
				case 'Rlt':
					return 'RLT';
				case 'Qa':
					return 'QA';
				case 'Phs':
					return 'PHS';
				case 'Kyc':
					return 'KYC';
				case 'Hr':
					return 'HR';
				case 'Kml':
					return 'KML';
				default:
					return el;  // Return the original element if it doesn't match any case
			}
		});

		// Join the words with spaces
		return formattedWordsChange.join(' ');
	}
}
