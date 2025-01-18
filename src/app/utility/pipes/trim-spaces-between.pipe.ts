// trim-spaces.pipe.ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'trimSpacesBetween',
	standalone: true
})
export class TrimSpacesBetweenPipe implements PipeTransform {
	transform (value: string): string {
		return value.replace(/\s/g, '');
		// return value.replace(/\s+/g, ' ').trim();
	}
}
