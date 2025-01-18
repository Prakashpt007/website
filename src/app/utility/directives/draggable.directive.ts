// draggable-scroll.directive.ts
import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
	selector: '[appDraggableScroll]',
	standalone: true
})
export class DraggableScrollDirective {
	private isDragging = false;
	private startX = 0;
	private scrollLeft = 0;

	constructor (private el: ElementRef, private renderer: Renderer2) {
		this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
	}

	@HostListener('mousedown', ['$event'])
	onMouseDown (event: MouseEvent) {
		this.isDragging = true;
		this.startX = event.pageX - this.el.nativeElement.offsetLeft;
		this.scrollLeft = this.el.nativeElement.scrollLeft;
		this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
		this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');
	}

	@HostListener('document:mouseup')
	onMouseUp () {
		this.isDragging = false;
		this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
		this.renderer.removeStyle(this.el.nativeElement, 'user-select');
	}

	@HostListener('document:mousemove', ['$event'])
	onMouseMove (event: MouseEvent) {
		if (!this.isDragging) return;
		event.preventDefault();
		const x = event.pageX - this.el.nativeElement.offsetLeft;
		const walk = (x - this.startX) * 2; //scroll-fast
		this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
	}
}
