import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'extractFileExtension',
	standalone: true
})
export class ExtractFileExtensionPipe implements PipeTransform {
	transform (url: string): string {
		if (!url) {
			return '';
		}

		// Use JavaScript's string methods to extract the file extension
		const segments = url.split('.');
		if (segments.length > 1) {
			return segments[segments.length - 1];
		} else {
			return '';
		}
	}
}
