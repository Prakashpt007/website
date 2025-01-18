import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	private storageSubject = new BehaviorSubject<string | null>(null);

	watchStorage (watchKey: string) {
		return this.storageSubject.asObservable().pipe(
			map(key => {
				if (key) {
					const getValue = localStorage.getItem(watchKey);
					return getValue ? {key, value: getValue} : null;
				}
				return null;
			})
		);
	}

	setItem (key: string, value: string) {
		// console.log(`Setting key: ${ key }, value: ${ value }`);
		localStorage.setItem(key, value);
		this.storageSubject.next(key); // Emit the key
	}

	removeItem (key: string) {
		if (localStorage.getItem(key) !== null) {
			console.log(`Removing key: ${ key }`);
			localStorage.removeItem(key);
			this.storageSubject.next(key); // Emit key removal
		} else {
			console.warn(`Key ${ key } does not exist in localStorage.`);
		}
	}
}
