export interface Configuration {
  OIDC_ISSUER: string;
  DATA_SERVICE_CATALOG_URL: string;
  ORGANIZATION_CATALOG_URI: string;
  SEARCH_API: string;
  SEARCH_HOST: string;
  ADMIN_GUI_HOST: string;
  USE_DEMO_LOGO: boolean;
  CATALOG_ADMIN_BASE_URI: string;
  CATALOG_PORTAL_BASE_URI: string;
}

export * from './domain';
export * from './common';
