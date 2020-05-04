import { DataService } from '../../types';
import { Status } from '../../types/enums';

export const mapDataServiceToValues = ({
  id,
  status = Status.DRAFT,
  dataServiceStatus = {},
  organizationId = '',
  title = {},
  version,
  operationCount,
  contact = {},
  mediaTypes = [],
  description = {},
  endpointUrls = [''],
  endpointDescriptions = [''],
  license = {},
  access = {},
  termsAndConditions = {},
  serviceType,
  servesDataset = [],
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
  mediaTypes,
  description,
  endpointUrls,
  endpointDescriptions,
  license,
  access,
  termsAndConditions,
  serviceType,
  servesDataset,
  imported
});
