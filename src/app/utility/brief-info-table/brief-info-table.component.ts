import {Component, Input} from '@angular/core';

import {ShowNewComponent} from '../show-new/show-new.component';

@Component({
	selector: 'brief-info-table',
	standalone: true,
	imports: [ShowNewComponent],
	templateUrl: './brief-info-table.component.html',
	styleUrls: ['./brief-info-table.component.scss']
})
export class BriefInfoTableComponent {

	@Input() pageData!: any;

	getWordInitials (sentence: string): string {
		return sentence
			.split(' ')
			.map(word => word.charAt(0).toUpperCase())
			.join('');
	}

}
