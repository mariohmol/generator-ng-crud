import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
export { AppComponent } from './app.component';

<% entities.forEach(function (entity) { -%>
import { <%= entity.capitalize %>Module } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>.module';
<% }) -%>

  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    <% entities.forEach(function (entity) { -%>
    <%= entity.capitalize %>Module,
    <% }) -%>
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




/**
 * 
 * 
 * 
 * import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import ptBr from '@angular/common/locales/pt';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppSharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { registerLocaleData } from '@angular/common';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

registerLocaleData(ptBr);

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { AppCoreModule } from './core/core.module';

import { HomeModule } from './home/home.module';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';
import { OrderModule } from './order/order.module';


@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppCoreModule,
    AppSharedModule,
    HttpClientModule,
    TextMaskModule,
    NgBrazil,
    BuyerModule,
    SellerModule,
    OrderModule,
    HomeModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<% if (props.location === 'hash') { -%>
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
<% } -%>
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
<% if (props.pwa) { -%>
import { ServiceWorkerModule } from '@angular/service-worker';
<% } -%>
import { TranslateModule } from '@ngx-translate/core';
<% if (props.ui === 'material') { -%>
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
<% } else if (props.ui === 'bootstrap') { -%>
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<% } else if (props.ui === 'ionic') { -%>
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
<% } -%>
<% if (props.target.includes('cordova')) { -%>
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
<% } -%>
<% if (props.angulartics) { -%>
import { Angulartics2Module } from 'angulartics2';
<% } -%>
<% if (props.angulartics && props.analyticsProvider === 'ga') { -%>
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
<% } -%>

<% if (props.pwa) { -%>
import { environment } from '../../../environments/environment';
<% } -%>
import { CoreModule } from './core';
import { SharedModule } from '../app/shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
<% if (!props.lazy) { -%>
import { AboutModule } from './about/about.module';
<% } -%>
<% if (props.auth) { -%>
import { LoginModule } from './login/login.module';
<% } -%>
<% if (props.layout === 'tabs') { -%>
import { SettingsModule } from './settings/settings.module';
<% } -%>
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
<% if (props.pwa) { -%>
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
<% } -%>
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
<% if (props.ui === 'material') { -%>
    BrowserAnimationsModule,
    MaterialModule,
<% } else if (props.ui === 'bootstrap') { -%>
    NgbModule,
<% } else if (props.ui === 'ionic') { -%>
    IonicModule.forRoot(),
<% } -%>
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
<% if (props.layout === 'tabs'){ -%>
    SettingsModule,
<% } -%>
<% if (!props.lazy) { -%>
    AboutModule,
<% } -%>
<% if (props.auth) { -%>
    LoginModule,
<% } -%>
<% if (props.angulartics ) { -%>
    Angulartics2Module.forRoot(),
<% } -%>
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
<% if (props.location === 'hash') { -%>
    // This strategy with base-href './' allows to move the app to any subsite
<%   if (props.target.includes('cordova')) { -%>
    { provide: LocationStrategy, useClass: HashLocationStrategy },
<%   } else { -%>
    { provide: LocationStrategy, useClass: HashLocationStrategy }
<%   } -%>
<% } -%>
<% if (props.target.includes('cordova')) { -%>
    Keyboard,
    StatusBar,
    SplashScreen
<% } -%>
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


 */
