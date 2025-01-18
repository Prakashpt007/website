import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MainContainerComponent} from './container/default-layout/main-container.component';
import {HeaderComponent} from './container/header/header.component';
import {SidebarComponent} from './container/sidebar/sidebar.component';
import {FooterComponent} from './container/footer/footer.component';
import {LoginComponent} from './authentication/login/login.component';
import {LoginSvgComponent} from './authentication/login/login-svg.component';
import {CropdataSvgComponent} from './authentication/login/cropdata-svg.component';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ThemeButtonComponent} from './container/theme-button/theme-button.component';
import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {storeReducer} from './utility/store/store.reducer';
import {StoreModule} from '@ngrx/store';
import {LoadingService} from './loading.service';
import {LoadingInterceptor} from './loading.interceptor';
import {MatExpansionModule} from '@angular/material/expansion';
import {GetBetterNamePipe} from './utility/pipes/get-better-name.pipe';
import {ColormodeComponent} from './container/colormode/colormode.component';
import {SearchMenuComponent} from './container/search-menu/search-menu.component';

@NgModule({
	declarations: [
		AppComponent,
		MainContainerComponent,
		HeaderComponent,
		SidebarComponent,
		FooterComponent,
		LoginComponent
	],
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ThemeButtonComponent,
		LoginSvgComponent,
		CropdataSvgComponent,
		MatExpansionModule,
		GetBetterNamePipe,
		ColormodeComponent,
		SearchMenuComponent,
		ToastrModule.forRoot({
			timeOut: 10000,
			// disableTimeOut: true,
			progressBar: true,
			progressAnimation: "increasing",
			easing: "ease",
			easeTime: 300,
			positionClass: "toast-top-right",
			closeButton: true,
			tapToDismiss: true,
			maxOpened: 3,
			autoDismiss: true
		}),
		NgbModule,
		StoreModule.forRoot({store: storeReducer})
	],
	providers: [
		LoadingService,
		provideClientHydration(),
		provideAnimationsAsync(),
		provideAnimations(),
		provideHttpClient(withInterceptorsFromDi()),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoadingInterceptor,
			multi: true
		},
		SidebarComponent
	]
})
export class AppModule { }
