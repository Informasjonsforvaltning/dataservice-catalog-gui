import { Status, StatusText, ServiceType, Language } from './enums';

interface DataServiceStatus {
  statusText?: StatusText;
  expirationDate?: string;
  comment?: string;
  supersededByUrl?: string;
}

export interface DataService {
  created?: string;
  modified?: string;
  id?: string;
  organizationId: string;
  title: MultiLanguageText;
  version?: string;
  operationCount?: number;
  contact: Partial<Contact>;
  formats: string[];
  mediaTypes: string[];
  description: MultiLanguageText;
  endpointUrls: string[];
  endpointDescriptions: string[];
  externalDocs: Partial<ExternalDocumentation>;
  license: Partial<License>;
  access: Partial<Access>;
  termsAndConditions: Partial<TermsAndConditions>;
  status: Status;
  serviceType?: ServiceType;
  servesDataset: string[];
  dataServiceStatus: DataServiceStatus;
  accessRights: string;
  keywords: MultiLanguageText[];
  landingPage: string;
  pages: string[];
  themes: string[];
  type: string;
  imported: boolean;
}

export interface ImportFormData {
  apiSpecUrl: string;
}

export interface TermsAndConditions {
  usageLimitation: MultiLanguageText;
  price: MultiLanguageText;
  capacityAndPerformance: MultiLanguageText;
  reliability: MultiLanguageText;
}

export interface License {
  name: string;
  url: string;
}

export interface Access {
  isAuthoritativeSource: boolean;
  isOpenAccess: boolean;
  isOpenLicense: boolean;
  isFree: boolean;
}

export interface Contact {
  name: string;
  url: string;
  email: string;
  phone: string;
}

export type MultiLanguageText = { [key in Language]?: string };

export type MultiLanguageTextArray = { [key in Language]?: string[] };

export interface Organization {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
}

export interface Dataset {
  id: string;
  uri: string;
  title: MultiLanguageText;
}

export interface Concept {
  uri: string;
  prefLabel: MultiLanguageText;
}

export interface MediaType {
  uri: string;
  name: string;
}

export interface FileType {
  uri: string;
  code: string;
}

export interface OpenLicense {
  uri: string;
  code: string;
  label: { ['no']: string };
  isReplacedBy?: string;
}

export interface ReferenceData {
  mediatypes?: MediaType[];
  openlicenses?: OpenLicense[];
  filetypes?: FileType[];
}

export interface ExternalDocumentation {
  description: string;
  url: string;
}
