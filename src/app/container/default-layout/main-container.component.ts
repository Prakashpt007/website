import {ChangeDetectorRef, Component} from "@angular/core";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {fadeSlideUp} from "../../app.animation";

@Component({
	selector: "app-main-container",
	templateUrl: "./main-container.component.html",
	styleUrls: ["./main-container.component.scss"],
	standalone: false,
	providers: [NgbModalConfig, NgbModal],
	animations: [
		fadeSlideUp,
		//   trigger("fade", [
		//     transition(":enter", [
		//       style({ opacity: 0 }),
		//       animate("500ms ease", style({ opacity: 1 })),
		//     ]),
		//     transition(":leave", [
		//       style({ opacity: 1 }),
		//       animate("500ms ease", style({ opacity: 0 })),
		//     ]),
		//   ]),
		// ],
		// animations: [slideUpAnimation],
	],
})
export class MainContainerComponent {
	sidebarStatus!: boolean;

	constructor (private cdRef: ChangeDetectorRef) {
		//    private _ngbConfig;
		// ariaLabelledBy: string;
		// ariaDescribedBy: string;
		// backdrop: boolean | 'static';
		// beforeDismiss: () => boolean | Promise<boolean>;
		// centered: boolean;
		// container: string | HTMLElement;
		// fullscreen: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string;
		// injector: Injector;
		// keyboard: boolean;
		// scrollable: boolean;
		// size: 'sm' | 'lg' | 'xl' | string;
		// windowClass: string;
		// modalDialogClass: string;
		// backdropClass: string;
		// private _animation;
		// constructor(_ngbConfig: NgbConfig);
		// get animation(): boolean;
		// set animation(animation: boolean);
		// static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalConfig, never>;
		// static ɵprov: i0.ɵɵInjectableDeclaration<NgbModalConfig>;
	}

	getSidebarStatus (value: boolean) {
		this.sidebarStatus = value;
	}

	ngAfterViewInit (): void {
		this.cdRef.detectChanges();
		// throw new Error('Method not implemented.');
	}
}
