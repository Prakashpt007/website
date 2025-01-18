import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {ImageCropperComponent} from 'ngx-image-cropper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormatTextPipe} from '../../utility/pipes/format-text.pipe';
import {MultiSelectComponent} from '../../utility/multi-select/multi-select.component';
import {MultiSelect2Component} from '../../utility/multi-select-2/multi-select-2.component';


@NgModule({
	declarations: [
		ProfileComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ProfileRoutingModule,
		ImageCropperComponent,
		FormatTextPipe,
		MultiSelectComponent,
		MultiSelect2Component
	]
})
export class ProfileModule { }
