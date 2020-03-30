import {
  GET_DATA_SERVICE_FAILED,
  GET_DATA_SERVICE_REQUESTED,
  GET_DATA_SERVICE_SUCCEEDED,
  PATCH_DATA_SERVICE_FAILED,
  PATCH_DATA_SERVICE_REQUESTED,
  PATCH_DATA_SERVICE_SUCCEEDED,
  DELETE_DATA_SERVICE_FAILED,
  DELETE_DATA_SERVICE_REQUESTED,
  DELETE_DATA_SERVICE_SUCCEEDED,
  IMPORT_DATA_SERVICE_FAILED,
  IMPORT_DATA_SERVICE_REQUESTED,
  IMPORT_DATA_SERVICE_SUCCEEDED,
  RESET_DATA_SERVICE
} from './action-types';

import { DataService } from '../../../types';

export function importDataServiceFailed(message: string) {
  return {
    type: IMPORT_DATA_SERVICE_FAILED,
    payload: {
      message
    }
  };
}

export function importDataServiceRequested(
  importUrl: string,
  organizationId: string,
  onError: (message: string) => void,
  onSuccess: () => void,
  dataServiceId?: string
) {
  return {
    type: IMPORT_DATA_SERVICE_REQUESTED,
    payload: {
      importUrl,
      dataServiceId,
      organizationId,
      onSuccess,
      onError
    }
  };
}

export function importDataServiceSucceeded(dataService: DataService) {
  return {
    type: IMPORT_DATA_SERVICE_SUCCEEDED,
    payload: {
      dataService
    }
  };
}

export function getDataServiceRequested(
  dataServiceId: string,
  organizationId: string,
  onError: () => void
) {
  return {
    type: GET_DATA_SERVICE_REQUESTED,
    payload: {
      dataServiceId,
      organizationId,
      onError
    }
  };
}

export function getDataServiceSucceeded(dataService: DataService) {
  return {
    type: GET_DATA_SERVICE_SUCCEEDED,
    payload: {
      dataService
    }
  };
}

export function getDataServiceFailed(message: string) {
  return {
    type: GET_DATA_SERVICE_FAILED,
    payload: {
      message
    }
  };
}

export function patchDataServiceRequested(dataService: Partial<DataService>) {
  return {
    type: PATCH_DATA_SERVICE_REQUESTED,
    payload: {
      dataService
    }
  };
}

export function patchDataServiceSucceeded(dataService: DataService) {
  return {
    type: PATCH_DATA_SERVICE_SUCCEEDED,
    payload: {
      dataService
    }
  };
}

export function patchDataServiceFailed(message: string) {
  return {
    type: PATCH_DATA_SERVICE_FAILED,
    payload: {
      message
    }
  };
}

export function deleteDataServiceRequested(
  dataServiceId: string,
  organizationId: string,
  onSuccess: () => void
) {
  return {
    type: DELETE_DATA_SERVICE_REQUESTED,
    payload: {
      dataServiceId,
      organizationId,
      onSuccess
    }
  };
}

export function deleteDataServiceSucceeded() {
  return {
    type: DELETE_DATA_SERVICE_SUCCEEDED
  };
}

export function deleteDataServiceFailed(message: string) {
  return {
    type: DELETE_DATA_SERVICE_FAILED,
    payload: {
      message
    }
  };
}

export function resetDataService() {
  return {
    type: RESET_DATA_SERVICE
  };
}
