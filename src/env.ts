import { Configuration } from './types';

interface EnvironmentVariables {
  OIDC_ISSUER: string;
  DATA_SERVICE_CATALOG_URL: string;
  FDK_REGISTRATION_BASE_URI: string;
  ORGANIZATION_CATALOG_URI: string;
  SEARCH_API: string;
  SEARCH_FULLTEXT_HOST: string;
  ADMIN_GUI_HOST: string;
  USE_DEMO_LOGO: boolean;
  CATALOG_ADMIN_BASE_URI: string;
}

const env = ((window as any).env || {
  OIDC_ISSUER:
    'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk',
  DATA_SERVICE_CATALOG_URL:
    'https://dataservice-catalog.staging.fellesdatakatalog.digdir.no',
  FDK_REGISTRATION_BASE_URI:
    'https://registrering.staging.fellesdatakatalog.digdir.no',
  ORGANIZATION_CATALOG_URI:
    'https://organization-catalog.staging.fellesdatakatalog.digdir.no',
  SEARCH_API: 'https://staging.fellesdatakatalog.digdir.no',
  SEARCH_FULLTEXT_HOST: 'https://search.staging.fellesdatakatalog.digdir.no',
  ADMIN_GUI_HOST: 'https://admin.fellesdatakatalog.digdir.no',
  CATALOG_ADMIN_BASE_URI:
    'https://catalog-admin.staging.fellesdatakatalog.digdir.no',
  USE_DEMO_LOGO: false
}) as EnvironmentVariables;

export default { ...env } as Configuration;
