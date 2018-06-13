import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { OAuthService, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private authService: OAuthService,
    private authConfig: AuthConfig,
  ) {
    this.authService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
    });

    this.authService.configure(authConfig);

    this.authService.events
      .pipe(filter(e => e.type === 'silent_refresh_error'))
      .subscribe(e => this.authService.initImplicitFlow());

    this.authService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(e => this.authService.loadUserProfile());

    this.authService
      .loadDiscoveryDocument()
      .then(_ => this.authService.tryLogin())
      .then(_ => {
        if (!this.authService.hasValidAccessToken()) {
          this.authService.silentRefresh();
        }
      });
  }

  public login() { this.authService.initImplicitFlow(); }
  public logoff() { this.authService.logOut(); }
  public refresh() { this.authService.silentRefresh(); }

  public reset() {
    localStorage.clear();
    window.location.href = window.location.origin;
  }

  public get accessToken() { return this.authService.getAccessToken(); }
  public get accessTokenExpiration() { return this.authService.getAccessTokenExpiration(); }
  public get identityClaims() { return this.authService.getIdentityClaims(); }
  public get idToken() { return this.authService.getIdToken(); }
  public get idTokenExpiration() { return this.authService.getIdTokenExpiration(); }
  public get refreshToken() { return this.authService.getRefreshToken(); }
}
