import { RecordStatus, DatasetStatus, Status } from './enums';

// TODO: delete
export interface Record {
  id?: string;
  status: RecordStatus;
  organizationId: string;
  purpose: string;
  dataSubjectCategories: string[];
  personalDataCategories: string[];
  recipientCategories: string[];
  personalDataSubjects: string;
  plannedDeletion: string;
  highPrivacyRisk?: boolean;
  articleSixBasis: ArticleSixBasis[];
  otherArticles: Partial<OtherArticles>;
  businessAreas: string[];
  securityMeasures: string;
  privacyProcessingSystems: string;
  dataProcessorContactDetails: Omit<ContactDetailsInterface, 'address'>;
  commonDataControllerContact: Partial<CommonDataControllerContact>;
  dataTransfers: Partial<DataTransfers>;
  title: string;
  relatedDatasets: string[];
  dataProtectionImpactAssessment: Partial<DataProtectionImpactAssessment>;
  dataProcessingAgreements: DataProcessingAgreement[];
  endpointDescriptionUrls: string[];
  updatedAt: string;
}

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
  version: string;
  operationCount: number;
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
  created: string;
  modified: string;
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

export interface ContactDetailsInterface {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface RepresentativesInterface {
  dataControllerRepresentative: ContactDetailsInterface;
  dataControllerRepresentativeInEU: ContactDetailsInterface;
  dataProtectionOfficer: ContactDetailsInterface;
}

export interface ArticleSixBasis {
  legality: string;
  referenceUrl: string;
}

export interface Article {
  checked: boolean;
  referenceUrl: string;
}

export interface OtherArticles {
  articleNine: Partial<Article>;
  articleTen: Partial<Article>;
}

export interface CommonDataControllerContact {
  companies: string;
  distributionOfResponsibilities: string;
  contactPoints: Omit<ContactDetailsInterface, 'address'>[];
}

export interface DataTransfers {
  transferred: boolean;
  thirdCountryRecipients: string;
  guarantees: string;
}

export interface DataProtectionImpactAssessment {
  conducted: boolean;
  assessmentReportUrl: string;
}

export interface DataProcessingAgreement {
  dataProcessorName: string;
  agreementUrl: string;
}

export interface Organization {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
}

interface TranslatableField {
  [key: string]: string;
}

export interface Dataset {
  id: string;
  title: TranslatableField;
  registrationStatus: DatasetStatus;
}
