import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';

/** @title Drawer with explicit backdrop setting */
@Component({
	selector: 'sidenav-backdrop-example',
	template: `
	<h6>Drawer with explicit backdrop setting</h6>
	<mat-drawer-container class="example-container" [hasBackdrop]="hasBackdrop.value">
		<mat-drawer #drawer [mode]="mode.value">I'm a drawer</mat-drawer>
		<mat-drawer-content>
			<mat-form-field>
			<mat-label>Sidenav mode</mat-label>
			<mat-select #mode value="side">
				<mat-option value="side">Side</mat-option>
				<mat-option value="over">Over</mat-option>
				<mat-option value="push">Push</mat-option>
			</mat-select>
			</mat-form-field>
			<mat-form-field>
			<mat-label>Has backdrop</mat-label>
			<mat-select #hasBackdrop>
				<mat-option>Unset</mat-option>
				<mat-option [value]="true">True</mat-option>
				<mat-option [value]="false">False</mat-option>
			</mat-select>
			</mat-form-field>

			<button type="button" color="accent" mat-raised-button (click)="drawer.toggle()">Toggle drawer</button>
		</mat-drawer-content>
	</mat-drawer-container>
	`,
	styles: `

	.example-container {
		width: 400px;
		height: 250px;
		margin: 12px;
		border: 1px solid #555;
	}

	mat-drawer-content {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}


	`,
	standalone: true,
	imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
})
export class SidenavBackdropExample { }
