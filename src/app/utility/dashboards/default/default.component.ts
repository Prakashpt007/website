import {Component} from '@angular/core';
import {SearchMenuComponent} from '../../../container/search-menu/search-menu.component';

@Component({
	selector: 'app-default',
	templateUrl: './default.component.html',
	styleUrls: ['./default.component.scss'],
	imports: [SearchMenuComponent],
	standalone: true
})
export class DefaultComponent {

}
