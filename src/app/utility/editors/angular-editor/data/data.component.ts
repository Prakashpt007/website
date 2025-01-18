import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'app-data',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './data.component.html',
	styleUrl: './data.component.scss',
	encapsulation: ViewEncapsulation.ShadowDom
})
export class DataComponent {
	@Input() data!: any;

}
