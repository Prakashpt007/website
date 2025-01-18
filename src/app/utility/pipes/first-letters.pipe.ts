import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
	name: "firstLetters",
})
export class FirstLettersPipe implements PipeTransform {
	transform (value: string): string {
		if (!value) {
			return "";
		}

		const words = value.split(" ");
		const firstLetters = words.map((word) => word.charAt(0));
		return firstLetters.join("");
	}
}
