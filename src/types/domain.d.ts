import { Status } from './enums';

interface DataServiceStatus {
  statusText: Status;
  expirationDate?: string;
  comment?: string;
  supersededByUrl?: string;
}

export interface DataService {
  id?: string;
  status: DataServiceStatus;
  organizationId: string;
  title: MultiLanguageText;
  version?: string;
  operationCount?: number;
  contact: Partial<Contact>;
  endpointUrl: string;
  mediaType: string;
  description: MultiLanguageText;
  endpointDescription: MultiLanguageText;
  license: Partial<License>;
  access: Partial<Access>;
  termsAndConditions: Partial<TermsAndConditions>;
  serviceType: string;
  servesDataset: string[];
  created?: string;
  modified?: string;
}

export interface TermsAndConditions {
  cost: string;
  usageLimitation: string;
  performance: string;
  availability: string;
}

export interface License {
  name: string;
  url: string;
}

export interface Access {
  nationalComponent: boolean;
  isOpenAccess: boolean;
  isOpenLicense: boolean;
  isFree: boolean;
}

export interface Contact {
  name: string;
  url: string;
  email: string;
}

export interface MultiLanguageText {
  en?: string;
  no?: string;
  nn?: string;
}

export interface Organization {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
}
