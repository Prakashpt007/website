import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'sortObjectKeysAlphabetically'
})
export class SortObjectKeysAlphabeticallyPipe implements PipeTransform {

	transform (value: {[key: string]: any;}): {key: string, value: any;}[] {
		const sortedKeys = Object.keys(value).sort();
		return sortedKeys.map(key => ({key, value: value[key]}));
	}

}
