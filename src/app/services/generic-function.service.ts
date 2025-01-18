import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GenericFunctionService {

	constructor () { }

	updateFilterComponentData (
		params: {[key: string]: string;},
		filterComponentData: Array<any>
	): Array<any> {
		for (const item of filterComponentData) {
			if (params.hasOwnProperty(item.name)) {
				const value = params[item.name];
				if (item.type == "select") {
					if (item.name == "status") {
						item.value = value;
					} else {
						item.value = parseInt(value);
					}
				} else if (item.type == "multiselect") {
					if (value.includes(",")) {
						const valuesArray = value.split(",");
						item.value = valuesArray.map((value) => parseInt(value));
					} else {
						item.value = [parseInt(value)];
					}
				} else {
					item.value = value;
				}
			}
		}
		return filterComponentData;
	}

	stringToRegex (pattern: any): RegExp {
		// Remove leading and trailing slashes
		let patternBody = pattern.replace(/^\/|\/$/g, '');
		return new RegExp(patternBody);
	}

}
