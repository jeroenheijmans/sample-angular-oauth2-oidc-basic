import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'todo-specify-your-stuff-here',
  clientId: 'todo-specify-your-stuff-here',
  redirectUri: window.location.origin + '/',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email custom-api',
  silentRefreshTimeout: 5000, // For faster testing
};
