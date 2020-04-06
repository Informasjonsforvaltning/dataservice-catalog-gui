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
  endpointUrl = '',
  mediaTypes = [],
  description = {},
  endpointDescriptions = [''],
  license = {},
  access = {},
  termsAndConditions = {},
  serviceType,
  servesDataset = []
}: Partial<DataService>): DataService => ({
  id,
  status,
  dataServiceStatus,
  organizationId,
  title,
  version,
  operationCount,
  contact,
  endpointUrl,
  mediaTypes,
  description,
  endpointDescriptions,
  license,
  access,
  termsAndConditions,
  serviceType,
  servesDataset
});
