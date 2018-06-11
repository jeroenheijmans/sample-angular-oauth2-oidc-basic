import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule, AuthConfig, OAuthModuleConfig, ValidationHandler, JwksValidationHandler, OAuthStorage } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { authModuleConfig } from './auth-module-config';
import { authConfig } from './auth-config';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(authModuleConfig),
  ],
  providers: [
    { provide: AuthConfig, useValue: authConfig },
    { provide: OAuthModuleConfig, useValue: authModuleConfig },
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    { provide: OAuthStorage, useValue: localStorage },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
