export interface Configuration {
  OIDC_ISSUER: string;
  DATASERVICE_CATALOG_URL: string;
  FDK_REGISTRATION_BASE_URI: string;
  ORGANIZATION_API: string;
}

export * from './domain';
export * from './common';
