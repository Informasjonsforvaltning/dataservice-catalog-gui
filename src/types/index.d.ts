export interface Configuration {
  OIDC_ISSUER: string;
  DATA_SERVICE_CATALOG_URL: string;
  FDK_REGISTRATION_BASE_URI: string;
  ORGANIZATION_API: string;
}

export * from './domain';
export * from './common';
