import { Component } from '@angular/core';
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
    // For debugging purposes:
    this.authService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
    });

    this.authService.configure(authConfig);

    this.authService.events
      .filter(e => e.type === 'token_received')
      .subscribe(e => this.authService.loadUserProfile());

    this.authService.loadDiscoveryDocumentAndLogin();
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
