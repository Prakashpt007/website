import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'getBetterName',
	standalone: true
})
export class GetBetterNamePipe implements PipeTransform {

	transform (value: string | null, ...args: unknown[]): unknown {
		let betterName = "";
		// if (activityName == "VALIDATE_CASE_SCHEDULING") {
		//     betterName = "SCHEDULING";
		// } else if (activityName == "VALIDATE_CASE_SCHEDULING") {
		//     betterName = "SCHEDULING";
		// }

		switch (value) {
			case "VALIDATE_CASE_KYC":
				betterName = "KYC QA";
				break;
			case "VALIDATE_CASE_FINANCE":
				betterName = "Finance QA";
				break;
			case "VALIDATE_CASE_WAREHOUSE":
				betterName = "Warehouse QA";
				break;
			case "VALIDATE_CASE_KML":
				betterName = "Geo QA";
				break;
			case "VALIDATE_CASE_SCHEDULING":
				betterName = "Scheduling QA";
				break;
			case "INCOMPLETE_CASE":
				betterName = "Incomplete Case QA";
				break;
			case "SUPER_ADMIN":
				betterName = "Administrator";
				break;
			case "ALL_OPERATIONAL_DATA":
				betterName = "Operations Analyst";
				break;
			case "VERIFY_COMPANY":
				betterName = "Company QA";
				break;
			default:

				const words = value?.split('_');
				// Capitalize the first letter of each word and lowercase the rest
				const formattedWords = words?.map(word =>
					word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				);

				// Join the words with spaces
				betterName = `${ formattedWords?.join(' ') }`;
				break;
		}

		return betterName;

	}

}
