import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
	selector: 'input[numericValue]',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: NumericValueAccessorDirective,
			multi: true,
		},
	],
})
export class NumericValueAccessorDirective implements ControlValueAccessor {
	private onChange: any;
	private onTouched: any;

	constructor (private el: ElementRef, private renderer: Renderer2) { }

	writeValue (value: any): void {
		const normalizedValue = value == null ? '' : value.toString();
		this.renderer.setProperty(this.el.nativeElement, 'value', normalizedValue);
	}

	registerOnChange (fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched (fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
	}

	@HostListener('input', ['$event.target.value'])
	input (value: any): void {
		// Convert the input value to a number
		// console.log(value);

		const parsedValue = parseFloat(value);
		this.onChange(parsedValue);
		this.onTouched();
	}
}
