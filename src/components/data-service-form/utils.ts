import {
  DataService,
  MultiLanguageText,
  MultiLanguageTextArray
} from '../../types';
import { Status } from '../../types/enums';

export const mapMultiLanguageTextToMultiLanguageTextArray = (
  keywords: MultiLanguageText[]
): MultiLanguageTextArray =>
  keywords.reduce(
    (prev, current) => {
      prev.nb = prev.nb?.concat(current?.nb ?? []);
      prev.nn = prev.nn?.concat(current?.nn ?? []);
      prev.en = prev.en?.concat(current?.en ?? []);
      return prev;
    },
    {
      nb: [],
      nn: [],
      en: []
    } as MultiLanguageTextArray
  );

export const mapMultiLanguageTextArrayToMultiLanguageText = (
  keywords: MultiLanguageTextArray
): MultiLanguageText[] => [
  ...(keywords.nb?.map(keyword => ({ nb: keyword })) ?? []),
  ...(keywords.nn?.map(keyword => ({ nn: keyword })) ?? []),
  ...(keywords.en?.map(keyword => ({ en: keyword })) ?? [])
];

export const mapDataServiceToValues = ({
  id,
  status = Status.DRAFT,
  dataServiceStatus = {},
  organizationId = '',
  title = {},
  version,
  operationCount,
  contact = {},
  formats = [],
  mediaTypes = [],
  description = {},
  endpointUrls = [''],
  endpointDescriptions = [''],
  externalDocs = {},
  license = {},
  access = {},
  termsAndConditions = {},
  serviceType,
  servesDataset = [],
  accessRights = '',
  keywords = [],
  landingPage = '',
  pages = [],
  themes = [],
  type = '',
  imported = false
}: Partial<DataService>): DataService => ({
  id,
  status,
  dataServiceStatus,
  organizationId,
  title,
  version,
  operationCount,
  contact,
  formats,
  mediaTypes,
  description,
  endpointUrls,
  endpointDescriptions,
  externalDocs,
  license,
  access,
  termsAndConditions,
  serviceType,
  servesDataset,
  accessRights,
  keywords,
  landingPage,
  pages,
  themes,
  type,
  imported
});
