import { Auth } from '../lib/auth/auth';
import env from '../env';

const { FDK_REGISTRATION_BASE_URI, OIDC_ISSUER } = env;
const OIDC_CLIENT_ID = 'dataservice-catalog-gui';

export const authService = new Auth({
  oidcIssuer: OIDC_ISSUER,
  clientId: OIDC_CLIENT_ID,
  redirectUri: location.href,
  logoutRedirectUri: FDK_REGISTRATION_BASE_URI,
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
});

export default authService;
