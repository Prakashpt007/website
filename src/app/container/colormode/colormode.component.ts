import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
	selector: 'app-colormode',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './colormode.component.html',
	styleUrl: './colormode.component.scss'
})
export class ColormodeComponent {
	theme!: string;
	private mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

	constructor (private localStorageService: LocalStorageService) { }

	ngOnInit (): void {
		this.setTheme(this.getPreferredTheme());

		// Add listener for system theme changes
		this.mediaQueryList.addEventListener('change', this.handleSystemThemeChange.bind(this));
	}

	ngOnDestroy (): void {
		// Remove listener when the component is destroyed
		this.mediaQueryList.removeEventListener('change', this.handleSystemThemeChange.bind(this));
	}

	getStoredTheme () {
		if (localStorage.getItem('theme') == null) {
			this.changeTheme('auto');
		}

		return localStorage.getItem('theme');
	}

	setStoredTheme (theme: string) {
		localStorage.setItem('theme', theme);
	}

	getPreferredTheme () {
		const storedTheme = this.getStoredTheme();
		if (storedTheme) {
			return storedTheme;
		}

		return this.mediaQueryList.matches ? 'dark' : 'light';
	}

	setTheme (theme: string) {
		if (theme === 'auto') {
			this.theme = 'auto';
			const systemTheme = this.mediaQueryList.matches ? 'dark' : 'light';
			document.documentElement.setAttribute('data-bs-theme', systemTheme);
			this.localStorageService.setItem('cTheme', systemTheme);
		} else {
			this.theme = theme;
			document.documentElement.setAttribute('data-bs-theme', theme);
			this.localStorageService.setItem('cTheme', theme);
		}
	}

	changeTheme (theme: string) {
		this.setStoredTheme(theme);
		this.setTheme(theme);
	}

	handleSystemThemeChange (event: MediaQueryListEvent) {
		if (this.theme === 'auto') {
			const systemTheme = event.matches ? 'dark' : 'light';
			document.documentElement.setAttribute('data-bs-theme', systemTheme);
			this.localStorageService.setItem('cTheme', systemTheme);
		}
	}
}
