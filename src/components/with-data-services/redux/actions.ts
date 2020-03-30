import {
  FETCH_ALL_DATA_SERVICES_FAILED,
  FETCH_ALL_DATA_SERVICES_REQUESTED,
  FETCH_ALL_DATA_SERVICES_SUCCEEDED,
  SORT_DATA_SERVICES
} from './action-types';

import { DataService } from '../../../types';
import { SortOrder } from '../../../types/enums';

export function sortDataServices(field: string[], order: SortOrder) {
  return {
    type: SORT_DATA_SERVICES,
    payload: {
      field,
      order
    }
  };
}

export function fetchAllDataServicesRequested(organizationId: string) {
  return {
    type: FETCH_ALL_DATA_SERVICES_REQUESTED,
    payload: {
      organizationId
    }
  };
}

export function fetchAllDataServicesSucceeded(dataServices: DataService[]) {
  return {
    type: FETCH_ALL_DATA_SERVICES_SUCCEEDED,
    payload: {
      dataServices
    }
  };
}

export function fetchAllDataServicesFailed(message: string) {
  return {
    type: FETCH_ALL_DATA_SERVICES_FAILED,
    payload: {
      message
    }
  };
}
