import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'formatLabel',
})
export class FormatLabelPipe implements PipeTransform {
	//   transform (value: string): string {
	//     if (!value) return value;

	//     // Insert a space before each uppercase letter and capitalize the first letter
	//     return value
	//       .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
	//       .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
	//       .trim(); // Trim any unnecessary spaces
	// 	}


	transform (value: string): string {
		if (!value) return value;

		return value
			.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Handle transitions like 'GSTInvoice'
			.replace(/([a-z])([A-Z])/g, '$1 $2') // Handle transitions like 'invoiceFor'
			.replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
			.trim(); // Trim any unnecessary spaces
	}





}
