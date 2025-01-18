import {Component, Input} from '@angular/core';

import {GenericHttpService} from '../../services/generic-http.service';
import {CommonModule} from '@angular/common';

@Component({
	selector: 'brief-details-validation',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './brief-details-validation.component.html',
	styleUrls: ['./brief-details-validation.component.scss']
})
export class BriefDetailsValidationComponent {
	@Input() validation!: any;

	constructor (private genericHttp: GenericHttpService) { }

	ngOnInit (): void { }

	getValidationStsTooltip (key: any, value?: any) {
		return this.genericHttp.getValidationStsTooltip(key, value);
	}

	getValidationSts (value: any) {
		return this.genericHttp.getValidationSts(value);
	}

	getValidationStsIcon (key: any) {
		return this.genericHttp.getValidationStsIcon(key);
	}
}
