import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'timePipe',
	standalone: true
})
export class TimePipe implements PipeTransform {
	transform (value: String | undefined): string {
		if (!value) {
			return '';
		}

		// const [hours, minutes, seconds] = value.split(':');

		const [hours, minutes] = value.split(':');
		const hourValue = parseInt(hours, 10);
		const period = hourValue >= 12 ? 'PM' : 'AM';
		const formattedHour = hourValue % 12 || 12;
		const formattedTime = `${ formattedHour }:${ minutes } ${ period }`;

		return formattedTime;
	}
}
