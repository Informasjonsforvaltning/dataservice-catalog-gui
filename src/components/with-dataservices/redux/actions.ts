import {
  FETCH_ALL_DATASERVICES_FAILED,
  FETCH_ALL_DATASERVICES_REQUESTED,
  FETCH_ALL_DATASERVICES_SUCCEEDED,
  SORT_DATASERVICES
} from './action-types';

import { DataService } from '../../../types';
import { SortOrder } from '../../../types/enums';

export function sortDataServices(field: string[], order: SortOrder) {
  return {
    type: SORT_DATASERVICES,
    payload: {
      field,
      order
    }
  };
}

export function fetchAllDataServicesRequested(organizationId: string) {
  return {
    type: FETCH_ALL_DATASERVICES_REQUESTED,
    payload: {
      organizationId
    }
  };
}

export function fetchAllDataServicesSucceeded(dataServices: DataService[]) {
  return {
    type: FETCH_ALL_DATASERVICES_SUCCEEDED,
    payload: {
      dataServices
    }
  };
}

export function fetchAllDataServicesFailed(message: string) {
  return {
    type: FETCH_ALL_DATASERVICES_FAILED,
    payload: {
      message
    }
  };
}
