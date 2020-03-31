import { DataService } from '../../types';
import { Status } from '../../types/enums';

export const mapDataServiceToValues = ({
  id,
  status: { statusText } = { statusText: Status.DRAFT },
  organizationId = '',
  title = {},
  version,
  operationCount,
  contact: {
    name: contactName = '',
    email: contactEmail = '',
    url: contactUrl = ''
  } = {},
  endpointUrl = '',
  mediaType = '',
  description = {},
  endpointDescription = {},
  license: { name: licenseName = '', url: licenseUrl = '' } = {},
  access = {},
  termsAndConditions = {},
  serviceType = '',
  servesDataset = []
}: Partial<DataService>): DataService => ({
  id,
  status: { statusText },
  organizationId,
  title,
  version,
  operationCount,
  contact: { name: contactName, email: contactEmail, url: contactUrl },
  endpointUrl,
  mediaType,
  description,
  endpointDescription,
  license: { name: licenseName, url: licenseUrl },
  access,
  termsAndConditions,
  serviceType,
  servesDataset
});
