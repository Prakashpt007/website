// store.reducer.ts

import {createAction, createReducer, on} from '@ngrx/store';

// Define actions
export const setBackUrl = createAction('[Back URL] Set', (value: any) => ({value}));

export const addToDropdownArray = createAction('[Dropdown Array] Add', (value: string) => ({value}));

export const addToClickInfo = createAction('[Clicked Info] Add', (value: any) => ({value}));

export const addUserMenu = createAction('[User Menu] Add', (value: any) => ({value}));

export const addUserData = createAction('[User Data] Add', (value: any) => ({value}));

// Define initial state

export interface State {
	userData: {
		tokenAccess: any,
		userActivities: any,
		userId: any,
		mobile: any,
		full_name: any,
		email: any,
		userThumbnail: any,
		expires_in: any,
	},
	menu: any[],
	backUrl: {
		[key: string]: any;
	};
	dropdownArray: string[];
	clickedInfo: {
		url: string,
		id: number,
	},
}

export const initialState: State = {
	userData: {
		tokenAccess: "",
		userActivities: "",
		userId: "",
		mobile: "",
		full_name: "",
		email: "",
		userThumbnail: "",
		expires_in: "",
	},
	menu: [],
	backUrl: {
		page: 1,
		size: 20,
	},
	dropdownArray: [],
	clickedInfo: {
		url: "",
		id: 0,
	},
};

// Define storeReducer
export const storeReducer = createReducer(
	initialState,
	on(setBackUrl, (state, {value}) => ({...state, backUrl: value})),

	on(addToDropdownArray, (state, {value}) => ({
		...state,
		dropdownArray: [...state.dropdownArray, value]
	})),
	on(addToClickInfo, (state, {value}) => ({...state, clickedInfo: value})),
	on(addUserMenu, (state, {value}) => ({
		...state,
		menu: value
	})),
	on(addUserData, (state, {value}) => ({...state, userData: value})),
);


// Define AppState
export interface AppState {
	store: State;
}
