import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'timeFormat',
	standalone: true
})

export class TimeFormatPipe implements PipeTransform {
	transform (value: string, format: string = 'hh:mm a'): string {
		if (!value || !/^\d{2}:\d{2}$/.test(value)) {
			console.error('Invalid time format. Expected "HH:mm".');
			return value;
		}

		const [hourStr, minuteStr] = value.split(':');
		let hours = parseInt(hourStr, 10);
		const minutes = parseInt(minuteStr, 10);

		if (isNaN(hours) || isNaN(minutes)) {
			console.error('Invalid time value:', value);
			return value;
		}

		switch (format) {
			case 'hh:mm a': {
				const period = hours >= 12 ? 'PM' : 'AM';
				hours = hours % 12 || 12; // Convert to 12-hour format
				return `${ this.padZero(hours) }:${ this.padZero(minutes) } ${ period }`;
			}
			case 'HH:mm': {
				return `${ this.padZero(hours) }:${ this.padZero(minutes) }`; // 24-hour format
			}
			default:
				console.warn(`Unsupported time format: ${ format }`);
				return value;
		}
	}

	private padZero (num: number): string {
		return num < 10 ? `0${ num }` : `${ num }`;
	}
}