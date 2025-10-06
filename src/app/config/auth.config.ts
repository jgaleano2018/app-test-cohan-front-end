import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://localhost:8443/realms/myrealm',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'my-angular-app',
  responseType: 'code',
  scope: 'openid profile email', // add API scopes if you use them
  showDebugInformation: true,
  requireHttps: false, // set true for production (use https)
  strictDiscoveryDocumentValidation: false,
  skipIssuerCheck: false
};