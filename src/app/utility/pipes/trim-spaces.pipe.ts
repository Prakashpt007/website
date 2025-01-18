// trim-spaces.pipe.ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'trimSpaces',
	standalone: true
})
export class TrimSpacesPipe implements PipeTransform {
	transform (value: string): string {
		return value.replace(/\s+/g, ' ').trim();

	}
}
